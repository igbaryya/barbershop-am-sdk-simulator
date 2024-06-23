export const regexPattern = {
    PIN: /^\d{4}$/, 
    PHONE: /^\d{10}$/,
    ZIP_CODE: /^(\d{5}|\d{9})$/, 
    ADDRESS_LINE: /^.{1,200}$/, 
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    SSN: /^\d{9}$/,
    FIRST_NAME: /^.{1,30}$/,
    LAST_NAME: /^.{1,30}$/
};
