import {throttle} from 'lodash';
import constants from './constant';
import {saveStoreToStorage} from './sessionStorageHandler';

// ToDO: Handle all blacklist stores. 
export const subscribe = (reduxStore) => {
    reduxStore.subscribe(throttle(() => {
        saveStoreToStorage({
            ...reduxStore.getState()
        }); 
    }, constants.STORE_TIME_OUT));
    return reduxStore;
};
