import {
  ADD_TODOS, ADD_TODO, DELETE, TOGGLE,
} from '../helpers/actions';

const initialState = [];

export default function todos(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TODOS:
      return payload;
    case ADD_TODO:
      return [...state, payload];
    case DELETE:
      return state.filter(elem => elem.id !== +payload.id);
    case TOGGLE:
      return state.map((item) => {
        if (item.id === payload.id) {
          return {
            ...payload,
          };
        }
        return item;
      });
    default:
      return state;
  }
}
