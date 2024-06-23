export const isValueExistsInObj = (val, obj) => {
    const exists = Object.keys(obj).some((k) => {
        return obj[k] === val;
    });
    return exists;
};

export const cloneObj = (obj) => {
    let result = obj; 
    if (obj) {
        result = JSON.stringify(JSON.parse(obj));
    }
    return result; 
};

export const deepCompareObj = (obj1, obj2) => {
    if (obj1 === obj2) {
        return true;
    }
  
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }
  
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
        return false;
    }
  
    for (const key of keys1) {
        if (!keys2.includes(key) || !deepCompareObj(obj1[key], obj2[key])) {
            return false;
        }
    }
  
    return true;
};
  