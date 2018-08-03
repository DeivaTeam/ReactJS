import * as types from "./types";

const initialState = {
  isLoggedIn: false,
  user: null
};

export default (state = initialState, action)  => {
  const { type, payload } = action;
  switch (type) {
    case types.STORE_SESSION:
      return { isLoggedIn: true, user: payload };
    case types.LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};
