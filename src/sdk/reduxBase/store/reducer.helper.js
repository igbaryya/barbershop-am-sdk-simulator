import constants from './reducer.constans';

/**
 * @param {Object} arg1 | Full Store
 * @param {Array} arg2  | Whitelist
 * @param {Object} arg3 | Current State 
 * 
 * @returns Empty Store.
 */
const eraseStore = (arg1, arg2 = [], arg3) => {
    const clear = (obj, key) => {
        if (arg3[key] !== undefined) {
            obj[key] = arg3[key];
        }
        return obj;
    };
    const resultState = arg2.reduce(clear, arg1);
    return resultState;
};

export default (reducer, options = {}) => (state, action) => {
    const cleanActionType = !options.clearStateType ? constants.BASE_ACTION_TYPES.CLEAR_STORE : options.clearStateType;
    if (cleanActionType === action.type) {
        return eraseStore(reducer(undefined, action), options.whitelist, state); 
    }
    return reducer(state, action);
};

let reducers = {};
export const initReducers = (reducersMap, options = {}) => {
    if (options.noOverride) {
        reducers = {...reducersMap, ...reducers};
    } else {
        reducers = {...reducers, ...reducersMap};
    }    
};
