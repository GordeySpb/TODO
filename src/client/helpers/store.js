import {createStore, dispatch, applyMiddleware} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';




const store = createStore(reducer, applyMiddleware(thunk));




module.exports = store;
