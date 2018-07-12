import {createStore, dispatch} from 'redux';
import reducer from '../reducers';
import {ADD_TODOS, ADD_TODO, DELETE, UPDATE} from './actions';


const store = createStore(reducer);

module.exports = store;
