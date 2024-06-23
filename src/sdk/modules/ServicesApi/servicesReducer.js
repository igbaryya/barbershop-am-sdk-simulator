import {ActionTypes} from './servicesApi';

const initialState = {
    services: [],
    error: {}
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    let newState;
    switch (type) {
        case ActionTypes.SERVICES_ERROR:
            newState = {
                ...state,
                error: payload
            };
            break;
        case ActionTypes.UPDATE_SERVICES:
            newState = {
                ...state,
                services: payload
            };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
};

export default reducer;
