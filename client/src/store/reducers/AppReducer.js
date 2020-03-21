import * as AT from "src/store/actions/ActionTypes";

const initialState = { loading: false, message: null };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.Loading:
      return { ...state, loading: action.payload.loading };
    case AT.Message:
      return { ...state, message: action.payload.message };

    default:
      return state;
  }
};

export default appReducer;
