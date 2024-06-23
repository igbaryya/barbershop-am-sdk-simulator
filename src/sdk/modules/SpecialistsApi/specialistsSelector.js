import {createSelector} from 'reselect';

import config from './specialists.config';

export const sliceSelector = (state) => {
    return state[config.apiName];
};
export const getUserId = createSelector(sliceSelector, (slice) => {
    return slice.userId;
});
export const getMissingFields = createSelector(sliceSelector, (slice) => {
    return slice.missingFields;
});

export const getUserInfo = createSelector(sliceSelector, (slice) => {
    return slice.userInfo;
});

export const getLanguage = createSelector(sliceSelector, (slice) => {
    return slice.language;
});

export const isDarkMode = createSelector(sliceSelector, (slice) => {
    return slice.isDarkMode;
});
export const getQuickMessages = createSelector(sliceSelector, (slice) => {
    return slice.quickMessages;
});
export const seenMessagesSelector = createSelector(sliceSelector, (slice) => {
    return slice.seenMessages;
});
export const userInvitationsSelector = createSelector(sliceSelector, (slice) => {
    return slice.invitations;
});
export const alreadyInitSelector = createSelector(sliceSelector, (slice) => {
    return slice.alreadyInit;
});
