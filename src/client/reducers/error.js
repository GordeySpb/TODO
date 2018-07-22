import {SET_ERROR_STATE} from '../helpers/actions';

const initialState = false;


export default function error(state = initialState, {type, payload}) {
    switch(type) {
        case SET_ERROR_STATE: return payload;
        default: return state;
    }
}