import { combineReducers } from 'redux';

import todos from './todos';
import preloader from './preloader';
import error from './error';

export default combineReducers({
    todos,
    preloader,
    error
})