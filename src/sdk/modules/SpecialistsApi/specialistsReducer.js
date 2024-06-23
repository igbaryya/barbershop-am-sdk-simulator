import {ActionTypes} from './specialistsApi';

const initialState = {
    error: {}
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    let newState;
    switch (type) {
        case ActionTypes.SPECIALISTS_ERROR:
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
