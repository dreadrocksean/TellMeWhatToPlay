import * as AT from '../actions/ActionTypes';

const initialState = { live: false, image: null, artistEdit: false, };

const artistReducer = (state = initialState, action) => {
  // console.log('artistReducer action', action);
  switch (action.type) {
    case AT.OnAir:
      return { ...state, live: true, };
    case AT.OffAir:
      return { ...state, live: false, };
    case AT.addArtistPhoto:
      // console.log('addArtistPhoto', action);
      return { ...state, image: action.payload, };
    case AT.artistEdit:
      // console.log('artistEdit', action);
      return { ...state, artistEdit: action.payload, };

    default: 
      return state;
  }
};

export default artistReducer;