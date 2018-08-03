import createAction from '../actionCreator';

const action = createAction('session');

export const STORE_SESSION = action('STORE_SESSION');
export const LOGOUT = action('LOGOUT');