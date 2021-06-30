import * as AT from "src/store/actions/ActionTypes";

const initialState = { currSong: {} };

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.CurrSong:
      console.log("TCL: songReducer -> action", action.payload)
      return { ...state, currSong: action.payload.song };

    default:
      return state;
  }
};

export default songReducer;
