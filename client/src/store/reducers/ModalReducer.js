import * as AT from "src/store/actions/ActionTypes";

const initialState = {
  show: false,
  content: null,
  height: null,
  hideCloseButton: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.SetModalContent: {
      const content = action.payload.content;
      return { ...state, content, show: !!content };
    }
    case AT.SetModalHeight: {
      return { ...state, height: action.payload.height };
    }
    case AT.HideModalCloseButton: {
      return { ...state, hideCloseButton: action.payload.hideCloseButton };
    }

    default:
      return state;
  }
};

export default modalReducer;
