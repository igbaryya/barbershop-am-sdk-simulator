/* eslint-disable import/no-anonymous-default-export */
export default {
    apiName: 'usersApi',
    userFields: {
        displayName: {
            mandatory: true,
            type: 'string'
        },
        photoURL: {
            mandatory: false,
            type: 'string'
        },
        email: {
            mandatory: false, 
            type: 'string'
        },
        age: {
            mandatory: false, 
            type: 'number'
        }
    },
    errors: {
        GENERAL_ERROR: {
            errorId: 'GENERAL_ERROR',
            description: 'General Error occurred, Please try again later.',
            operation: '' 
        },
        NOT_LOGGED_IN: {
            errorId: 'NOT_LOGGED_IN',
            description: 'Operation require Logged In user, Please login and retry',
            operation: ''
        }
    }
};
