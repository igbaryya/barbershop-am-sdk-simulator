import _ from 'lodash';
import {error, success} from '../responses';

export const validateActionInput = (inputAsObject) => {
    if (!inputAsObject || typeof inputAsObject !== 'object' || _.isEmpty(inputAsObject)) {
        return error('FAILURE', 'INVALID_INPUT', 'Object is not valid', 'Please verify the input');
    }
    
    let errResult; 
    Object.keys(inputAsObject).forEach((key) => {
        if (!inputAsObject[key] || _.isEmpty(inputAsObject[key])) {
            errResult = error('FAILURE', 'INVALID_INPUT', `${key} is empty!`, 'Please verify the input');
        }
    });

    if (errResult) {
        return errResult;
    }
    return success();
};
