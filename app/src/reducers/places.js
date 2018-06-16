import initialState from './initialState';
import {PLACES_SUCCESS, PLACES_UPDATED_MARKERS_SUCCESS} from "../constants/actoinTypes";
import Common from "../utils/Common";

export default function places(state = initialState.places, action) {
    switch (action.type) {
        case PLACES_SUCCESS:
            return updatePlaces([...action.data]);
        case PLACES_UPDATED_MARKERS_SUCCESS:
            return updatePlaces([...state]);
        default:
            return state;
    }
}

function updatePlaces (data) {
    return Common.setOpenCloseMarker(data.map(item => {
        return Object.assign({}, item);
    }));
}
