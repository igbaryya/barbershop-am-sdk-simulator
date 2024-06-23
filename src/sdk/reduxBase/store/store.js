import {applyMiddleware, compose, combineReducers, createStore as createReduxStore} from 'redux';
import {thunk} from 'redux-thunk';
import global from 'window-or-global';

import dynamicMiddlewares from './redux-dynamic-middlewares/index';
import eraseableReducer from './reducer.helper';
import {loadStoreFromStorage, subscribe} from './persister';

export const storeMiddlewares = [thunk, dynamicMiddlewares];

const createStore = (initialState = {}, reducers, options = {}) => {
    const presistStore = loadStoreFromStorage() || initialState; 
    const rootReducer = eraseableReducer(combineReducers({...reducers}), options);
    const enhancers = [];
    let composeEnhancers = compose;
    if (typeof global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
        composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }

    const store = createReduxStore (
        rootReducer,
        presistStore,
        composeEnhancers(
            applyMiddleware(...storeMiddlewares),
            ...enhancers
        )
    );
    return subscribe(store);
};

export default createStore;
