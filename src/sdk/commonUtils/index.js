import * as responses from './responses';
import * as constants from './constant';
import * as countryCodes from './countryCodes';
 
const generateGuid = () => {
    let result = '';
    let i;
    let j;
    for (j = 0; j < 32; j += 1) {
        i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        result += i;
    }
    return result;
}; 

export {
    constants,
    responses, 
    generateGuid,
    countryCodes
};
