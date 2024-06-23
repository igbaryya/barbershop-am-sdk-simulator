import constants from './constant';

export const loadStoreFromStorage = () => {
    if (!window || !window.sessionStorage) {
        return undefined; 
    }
    try {
        const serializedStore = window.sessionStorage.getItem(constants.STORAGE_KEY_NAME);
        if (serializedStore === null) {
            return undefined; 
        }
        return JSON.parse(serializedStore); 
    } catch (err) {
        return undefined; 
    }
};

export const saveStoreToStorage = (store) => {
    if (!window || !window.sessionStorage) {
        return;  
    }
    try {
        const serializedStore = JSON.stringify(store); 
        window.sessionStorage.setItem(constants.STORAGE_KEY_NAME, serializedStore);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to save to Store', err);
    }
};
