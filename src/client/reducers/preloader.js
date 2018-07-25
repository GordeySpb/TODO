import { SET_PRELOADER_STATE } from '../helpers/actions';

const initialState = false;

export default function preloader(state = initialState, { type, payload }) {
  switch (type) {
    case SET_PRELOADER_STATE:
      return payload;
    default:
      return state;
  }
}
