import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import config from "./config";
import places from "./places";

const rootReducer = combineReducers({
    routing: routerReducer,
    config: config,
    places: places
});

export default rootReducer;