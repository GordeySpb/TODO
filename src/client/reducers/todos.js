import {ADD_TODOS, ADD_TODO, DELETE, UPDATE} from '../helpers/actions';

const initialState = [];

export default function todos(state = initialState, {type, payload}) {
    switch (type) {
        case ADD_TODOS:
            return payload;
        case ADD_TODO:
            return  [...state, payload];
        case DELETE:
            return state.filter(elem => elem.id !== +payload.id);
        case UPDATE:
            return state.map(elem => {
                if (elem.id === +payload.id) {
                    return {
                        ...payload 
                    }
                }
                return elem;
            })
        default:
           return state; 
    }
}