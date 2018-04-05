import * as AT from '../actions/ActionTypes';

const initialState = { live: false };

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.OnAir:
      return { ...state, live: true, };
    case AT.OffAir:
      return { ...state, live: false, };

    default: 
      return state;
  }
};

export default artistReducer;