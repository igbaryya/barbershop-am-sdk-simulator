import {createSelector} from 'reselect';

import config from './services.config';

export const sliceSelector = (state) => {
    return state[config.apiName];
};
export const getUserId = createSelector(sliceSelector, (slice) => {
    return slice.userId;
});
export const servicesSelector = createSelector(sliceSelector, (slice) => {
    return slice.services;
});
