import {createStore, initReducers} from './reduxBase';
import modules from './modules';

let instance = null;
let reduxStore = null;

export const getStore = () => {
    return reduxStore;
};

const createInstance = (options = {}) => {
    const reducerMap = {}; 
    const instances = {}; 
    Object.keys(modules).forEach((key1) => {
        const obj = modules[key1];
        instances[key1] = obj.class; 
        reducerMap[key1] = obj.reducer;
    });
    reduxStore = options.store || getStore() || createStore({}, reducerMap);
    initReducers(reducerMap);
    if (!instance) {
        Object.keys(instances).forEach((key) => {
            instances[key] = new instances[key](reduxStore);
        });
        instance = {...instances};
    }
    return instance;
};

export const getInstance = (options) => {
    if (!instance) {
        instance = createInstance(options);
    }
    return instance;
};
