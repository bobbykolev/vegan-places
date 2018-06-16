import RestService from '../services/RestService';
import {PLACES_SUCCESS, TAGS_SUCCESS, TYPES_SUCCESS, PLACES_UPDATED_MARKERS_SUCCESS} from "../constants/actoinTypes";
import * as errorHandler from './errorHandler';

export function getPlaces() {
    return function(dispatch) {
        return RestService.get('./data/places_' + (localStorage.getItem('vp_ul') || 'en') + '.json?v=' + new Date().getTime()).then(function(data) {
            if (data && !arguments[2]) {
                dispatch({
                    type: PLACES_SUCCESS,
                    data: data.content
                });
            }
        }).catch(function(e) {
            errorHandler.handleError(dispatch, e);
        });
    };
}

export function updatePlacesMarkers() {
    return function(dispatch) {
        dispatch({
            type: PLACES_UPDATED_MARKERS_SUCCESS,
            data: null
        });
    };
}

export function getTags() {
    return function(dispatch) {
        return RestService.get('./data/places_tags_' + (localStorage.getItem('vp_ul') || 'en') + '.json?v=' + new Date().getTime()).then(function(data) {
            if (data && !arguments[2]) {
                dispatch({
                    type: TAGS_SUCCESS,
                    data: data
                });
            }
        }).catch(function(e) {
            errorHandler.handleError(dispatch, e);
        });
    };
}

export function getTypes() {
    return function(dispatch) {
        return RestService.get('./data/places_types_' + (localStorage.getItem('vp_ul') || 'en') + '.json?v=' + new Date().getTime()).then(function(data) {
            if (data && !arguments[2]) {
                dispatch({
                    type: TYPES_SUCCESS,
                    data: data
                });
            }
        }).catch(function(e) {
            errorHandler.handleError(dispatch, e);
        });
    };
}