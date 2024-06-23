import {ActionTypes} from './usersApi';

const initialState = {
    userId: '',
    error: {}
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    let newState;
    switch (type) {
        case ActionTypes.USER_INFO:
            newState = {
                ...state,
                error: {},
                userInfo: payload
            };
            break;
        case ActionTypes.USER_ID:
            newState = {
                ...state,
                error: {},
                uid: payload
            };
            break;
        case ActionTypes.USERS_ERROR:
            newState = {
                ...state,
                error: payload
            };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
};

export default reducer;
