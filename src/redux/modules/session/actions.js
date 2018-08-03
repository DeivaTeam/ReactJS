import * as types from "./types";

export const storeSession = (user) => ({
  type: types.STORE_SESSION,
  payload: user
});

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: types.LOGOUT
  });
};
