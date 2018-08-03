import createAction from '../actionCreator';

const action = createAction('wizard');

export const SET_SELECTION = action('SET_SELECTION');
export const LOAD_RESULTS = action('LOAD_RESULTS');
export const SIGNUP = action('SIGNUP');
export const SKIP_SIGNUP = action('SKIP_SIGNUP');
export const SET_STEP_PAGE = action('SET_STEP_PAGE');
export const COMPLETE_SELECTION = action('COMPLETE_SELECTION');
export const PRODUCT_LIST_VIEWED = action('PRODUCT_LIST_VIEWED');
export const PRODUCT_CLICKED = action('PRODUCT_CLICKED');
export const SEE_MORE_PRODUCTS_CLICKED = action('SEE_MORE_PRODUCTS_CLICKED');
export const USER_SIGNUP_SUCCESS = action('USER_SIGNUP_SUCCESS');
