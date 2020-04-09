import * as AT from "src/store/actions/ActionTypes";

const initialState = { currSong: null };

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.CurrSong:
      return { ...state, currSong: action.payload.song };

    default:
      return state;
  }
};

export default songReducer;
