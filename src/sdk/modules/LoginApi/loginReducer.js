import {ActionTypes} from './loginApi';

const initialState = {
    userId: '',
    error: {}
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    let newState;
    switch (type) {
        case ActionTypes.LOGIN_ERROR:
            newState = {
                ...state,
                error: payload
            };
            break;
        case ActionTypes.UPDATE_USER:
            newState = {
                ...state,
                error: {},
                user: payload
            };
            break;
        case ActionTypes.IS_LOGGED_IN:
            newState = {
                ...state,
                error: {},
                isLoggedIn: payload
            };
            break;
        case ActionTypes.UPDATE_SUBMITTED_PHONE_NUMBER:
            newState = {
                ...state,
                submittedPhoneNumber: payload
            };
            break;
        case ActionTypes.USER_GEO_CODE:
            newState = {
                ...state,
                error: {},
                countryCode: payload
            };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
};

export default reducer;
