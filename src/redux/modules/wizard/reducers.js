import * as types from "./types";
import { resolve } from '../../middleware/simple-promise';

const initialState = {
  step: '',
  selections: {
    relation: '',
    location: '',
    personality: {},
    budget: ''
  },
  results: [],
  loading: false,
  showResults: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_STEP_PAGE:
      return {
        ...state,
        step: payload
      };

    case types.SET_SELECTION:
      return {
        ...state,
        selections: {
          ...state.selections,
          [payload.key]: payload.val
        }
      };

    case types.COMPLETE_SELECTION:
      return state;

    case types.SEE_MORE_PRODUCTS_CLICKED:
      return state;

    case types.LOAD_RESULTS:
      return {
        ...state,
        loading: true,
        results: []
      };

    case resolve(types.LOAD_RESULTS):
      return {
        ...state,
        loading: false,
        results: payload
      };

    case types.PRODUCT_LIST_VIEWED:
      return state;

    case types.PRODUCT_CLICKED:
      return state;

    case resolve(types.SIGNUP):
    case types.SKIP_SIGNUP:
      return {
        ...state,
        showResults: true
      };

    default:
      return state;
  }
}
