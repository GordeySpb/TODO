import { combineReducers } from 'redux';

import todos from './todos';
import preloader from './preloader';

export default combineReducers({
    todos,
    preloader
})