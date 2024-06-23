import {createSelector} from 'reselect';

import config from './login.config';

export const sliceSelector = (state) => {
    return state[config.apiName];
};
export const stageSelector = createSelector(sliceSelector, (slice) => {
    return slice.stage;
});

export const getError = createSelector(sliceSelector, (slice) => {
    return slice.error;
});

export const userIdSelector = createSelector(sliceSelector, (slice) => {
    return slice.userId;
});

export const userInfoSelector = createSelector(sliceSelector, (slice) => {
    return slice.userInfo;
});

export const getCountryCode = createSelector(sliceSelector, (slice) => {
    return slice.countryCode;
});

export const isLoggedInSelector = createSelector(sliceSelector, (slice) => {
    return slice.isLoggedIn;
});
export const submittedPhoneNumberSelector = createSelector(sliceSelector, (slice) => {
    return slice.submittedPhoneNumber;
});
