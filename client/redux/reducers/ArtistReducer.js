import * as AT from '../actions/ActionTypes';

const initialState = { live: false, image: null, };

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.OnAir:
      return { ...state, live: true, };
    case AT.OffAir:
      return { ...state, live: false, };
    case AT.addArtistPhoto:
      console.log('addArtistPhoto', action);
      return { ...state, image: action.payload, };

    default: 
      return state;
  }
};

export default artistReducer;