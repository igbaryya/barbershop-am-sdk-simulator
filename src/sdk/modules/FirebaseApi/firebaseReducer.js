import {ActionTypes} from './firebaseApi';

const initialState = {
    userId: '',
    error: {}
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    let newState;
    switch (type) {
        case ActionTypes.FB_IS_AUTHENTICATED:
            newState = {
                ...state,
                error: {},
                isAuthenticated: payload
            };
            break;
        case ActionTypes.UPDATE_LANG:
            newState = {
                ...state,
                error: {},
                language: payload
            };
            break;
        case ActionTypes.UPDATE_MESSAGES:
            newState = {
                ...state,
                error: {},
                messages: payload
            };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
};

export default reducer;
