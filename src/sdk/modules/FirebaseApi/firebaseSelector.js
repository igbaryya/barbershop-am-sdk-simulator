import {createSelector} from 'reselect';
import config from './firebase.config';

export const sliceSelector = (state) => {
    return state[config.apiName];
};
export const isAuthenticated = createSelector(sliceSelector, (slice) => {
    return slice.isAuthenticated;
});

export const getLanguage = createSelector(sliceSelector, (slice) => {
    return slice.language;
});

export const getMessages = createSelector(sliceSelector, (slice) => {
    return slice.messages;
});
