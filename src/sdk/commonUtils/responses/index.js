import * as constants from './constant';

const success = () => {
    return {status: constants.SUCCESS};
};

const isSuccess = (response) => {
    return !!(response && response.status && response.status.toUpperCase() === constants.SUCCESS.toUpperCase());
};

const actionError = (errCode, errMsg, errDec = undefined) => {
    return {
        code: errCode,
        message: errMsg,
        description: errDec || `ERR_${errCode}`
    };
};

const error = (errorCode, errorMsg, errorDesc) => {
    return {
        error: actionError(errorCode, errorMsg, errorDesc),
        status: constants.FAILURE
    };
};
const checkImageURL = async (url) => {
    if (!url) {
        return false; 
    }
    try {
        const res = await fetch(url); 
        if (res.status === 404) { 
            return false; 
        }
        return true; 
    } catch (err) {
        return false; 
    }
};

export {
    actionError,
    error,
    success,
    isSuccess,
    checkImageURL
};
