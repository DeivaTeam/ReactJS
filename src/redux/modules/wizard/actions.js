import axios from 'axios';
import { EventTypes } from 'redux-segment';
import * as types from "./types";
import algolia, { productsIndex } from '../../../utils/algolia';
import relations from '../../../data/relations';
import personalities from '../../../data/personalities';
import locations from '../../../data/locations';
import budgets from '../../../data/budgets';

import { trackSubscribe } from '../../../utils/tracking';

export const TRACK_FROM_GIFT_GUIDE = 'GIFT_GUIDE';

export const setStep = (step) => ({
  type: types.SET_STEP_PAGE,
  payload: step,
  meta: {
    analytics: {
      eventType: EventTypes.track,
      eventPayload: {
        event: 'Gift Guide Step Viewed',
        properties: {
          label: step,
          track_from: TRACK_FROM_GIFT_GUIDE
        }
      }
    }
  }
});

export const seeMoreProductsClicked = () => ({
  type: types.SEE_MORE_PRODUCTS_CLICKED,
  meta: {
    analytics: {
      eventType: EventTypes.track,
      eventPayload: {
        event: 'Gift Guide See More Products Clicked',
        properties: {
          track_from: TRACK_FROM_GIFT_GUIDE
        }
      }
    }
  }
});

export const setSelection = (key, val) => ({
  type: types.SET_SELECTION,
  payload: { key, val },
  meta: {
    analytics: {
      eventType: EventTypes.track,
      eventPayload: {
        event: 'Gift Guide Step Interaction',
        properties: {
          label: key,
          track_from: TRACK_FROM_GIFT_GUIDE
        }
      }
    }
  }
});

export const completeSelection = selection => (dispatch, getState) => {
  const { step } = getState().wizard;

  dispatch({
    type: types.COMPLETE_SELECTION,
    meta: {
      analytics: {
        eventType: EventTypes.track,
        eventPayload: {
          event: 'Gift Guide Step Completed',
          properties: {
            label: step,
            selection,
            track_from: TRACK_FROM_GIFT_GUIDE
          }
        }
      }
    }
  });
};

export const loadResults = (query) => ({
  type: types.LOAD_RESULTS,
  payload: {
    promise: findResults(query)
  }
});

const constructListId = selections => {
  return Object.values(selections).map(selection => {
    if (typeof selection === 'object') {
      return Object.keys(selection).join('_');
    }

    return selection;
  }).join('_');
};

const constructCategory = ({ primary }) => {
  let result = null;

  if (primary) {
    if (Array.isArray(primary) && primary.length) {
      const { subcat } = primary[0];

      result = subcat.replace(/ > /g, '/');
    } else {
      result = `${primary.parentName}/${primary.name}`;
    }
  }
  return result;
};

const constructProducts = results => {
  return results.map((product, index) => {
    const { name, productCode, price, primaryCategories } = product;
    const category = primaryCategories
      ? constructCategory(primaryCategories)
      : '';

    return {
      name,
      product_id: productCode.toUpperCase(),
      price,
      category,
      position: (index + 1)
    };
  })
}

export const productListViewed = header => (dispatch, getState) => {
  const { results, selections } = getState().wizard;
  const extendedSelections = { header: constructHeader(header), ...selections };
  const list_id = constructListId(extendedSelections);
  const products = constructProducts(results);

  return dispatch({
    type: types.PRODUCT_LIST_VIEWED,
    meta: {
      analytics: {
        eventType: EventTypes.track,
        eventPayload: {
          event: 'Product List Viewed',
          properties: {
            list_id,
            products,
            category: header,
            product_list_quantity: products.length,
            track_from: TRACK_FROM_GIFT_GUIDE
          }
        }
      }
    }
  })
}

const constructHeader = header => {
  return header.replace(/!$/,'').replace(/ /g, '_');
};

export const productClicked = (product, header, index) => (dispatch, getState) => {
  const { name, productCode, price, friendlyURL, primaryCategories } = product;
  const url = `https://www.redballoon.com.au/product/${friendlyURL}`;
  const { selections } = getState().wizard;
  const extendedSelections = { header: constructHeader(header), ...selections };
  const list = constructListId(extendedSelections);
  const category = primaryCategories
    ? constructCategory(primaryCategories)
    : '';

  dispatch({
    type: types.PRODUCT_CLICKED,
    meta: {
      analytics: {
        eventType: EventTypes.track,
        eventPayload: {
          event: 'Product Clicked',
          properties: {
            list,
            name,
            product_id: productCode.toUpperCase(),
            price,
            category,
            position: index ? index : '',
            url,
            track_from: TRACK_FROM_GIFT_GUIDE
          }
        }
      }
    }
  })
}

export const signup = (email) => ({
  type: types.SIGNUP,
  payload: {
    promise: newsletterSignup(email)
  }
});

export const skipSignup = () => ({
  type: types.SKIP_SIGNUP,
  meta: {
    analytics: {
      eventType: EventTypes.track,
      eventPayload: {
        event: 'Gift Guide Signup Skipped',
        properties: {
          track_from: TRACK_FROM_GIFT_GUIDE
        }
      }
    }
  }
});

const userSignupSuccess = email => ({
  type: types.USER_SIGNUP_SUCCESS,
  meta: {
    analytics: {
      eventType: EventTypes.track,
      eventPayload: {
        event: 'Gift Guide Signup',
        properties: {
          email,
          track_from: TRACK_FROM_GIFT_GUIDE
        }
      }
    }
  }
});

function findResults(query) {
  const filters = ["countryCode:AU"];
  const numericFilter =[];
  const relationFilters = [];
  const filter = relations.find(r => r.value === 'dad').search;
  relationFilters.push.apply(relationFilters, filter);
  filters.push(relationFilters.map(f => `recipients.recipient.subcat:${f}`));
  Object.keys(query).forEach(key => {
    const val = query[key];
    if(key === 'location') {
      const filter = locations.find(r => r.value === val).search;
      filters.push(`locations.location.cat:${filter}`);
    } else if(key === 'personality') {
      const traitFilters = [];
      Object.keys(val).forEach(p => {
        const filter = personalities.find(r => r.value === p).search;
        traitFilters.push.apply(traitFilters, filter);
      });
      filters.push(traitFilters.map(f => `experiences.experience.subcat:${f}`));
    }
  });
  const budgetFilter = budgets.find(r => r.value === query.budget).search;

  return productsIndex.search({
    facetFilters: filters,
    filters: `price:${budgetFilter}`,
    hitsPerPage: 52,
      numericFilters:numericFilter
  }).then(res => res.hits);
}

function newsletterSignup(email) {
  return axios.post('https://www.redballoon.com.au/api/customer/subscriptions', {
    "commTypeId":1,
    "newsletterIds":[1,2,3],
    "email": email
  }).then(r => {
    trackSubscribe(email, r.data.gid);
    userSignupSuccess(email);
    return r.data;
  });
}
