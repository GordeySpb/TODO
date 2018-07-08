import {createStore, dispatch} from 'redux';
import {ADD_TODOS, ADD_TODO, DELETE, UPDATE} from './actions';

const initialState = [];

function reducer(state = initialState, {type, payload}) {
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


const store = createStore(reducer, initialState);

module.exports = store;
