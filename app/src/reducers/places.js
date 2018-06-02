import initialState from './initialState';
import {PLACES_SUCCESS} from "../constants/actoinTypes";

export default function places(state = initialState.places, action) {
    switch (action.type) {
        case PLACES_SUCCESS:
            return [...action.data];
        default:
            return state;
    }
}
