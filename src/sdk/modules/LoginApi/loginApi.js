import constants from 'sdk/reduxBase/store/reducer.constans';

import {createActionTypes} from '../../reduxBase';
import * as selectors from './loginSelector';
import {responses} from '../../commonUtils';
import {success} from '../../commonUtils/responses';
import FirebaseApi from '../FirebaseApi';
import UsersApi from '../UsersApi/usersApi';

export const ActionTypes = createActionTypes([
    'UPDATE_STAGE',
    'UPDATE_USER',
    'USER_GEO_CODE',
    'LOGIN_ERROR',
    'IS_LOGGED_IN',
    'UPDATE_SUBMITTED_PHONE_NUMBER'
]);

export default class LoginApi {
    name = 'LoginApi';

    constructor(store) {
        this.store = store;
        this.selectors = selectors;
        this.responses = responses;
        this.firebaseApi = new FirebaseApi(store).getInstance(); 
    }

    getState = () => {
        return this.selectors.sliceSelector(this.store.getState());
    };
    
    initializeLogin = async ({user}) => {
        await this.validateUser(user);
        this.store.dispatch({
            type: ActionTypes.UPDATE_USER, 
            payload: user
        });
        return success(); 
    };

    validateUser = async (user) => {
        const usersApi = new UsersApi(this.store);
        const userInfo = await usersApi.retrieveUser(user.uid);
        if (!userInfo) {
            await usersApi.initializeNewUser(user); 
        }
    };

    googleLogin = async () => {
        const fbAuth = this.firebaseApi.getAuthRef(false);
        let result; 
        try {
            const provider = new fbAuth.GoogleAuthProvider(); 
            result = await fbAuth().signInWithPopup(provider);
            this.initializeLogin(result);
        } catch (error) {
            result = error; 
        }        
        return result;
    };

    getCurrentUser = () => {
        const info = this.firebaseApi.getAuthRef().currentUser;
        return info;
    };
    
    getCurrentUserId = () => {
        const info = this.firebaseApi.getAuthRef().currentUser;
        return info && info.uid;
    };
    
    isLoggedIn = async () => {
        const info = this.getCurrentUser();
        return !!info;
    };

    updateSubmittedPhoneNumber = (updates) => {
        const oldInfo = this.selectors.submittedPhoneNumberSelector(this.store.getState());
        return this.store.dispatch({
            type: ActionTypes.UPDATE_SUBMITTED_PHONE_NUMBER, 
            payload: {
                ...oldInfo,
                ...updates
            }
        });
    };
    isLoggedInUser = () => this.selectors.isLoggedInSelector(this.store.getState());
    updateIsLoggedIn = (isLoggedIn) => {
        this.store.dispatch({
            type: ActionTypes.IS_LOGGED_IN, 
            payload: isLoggedIn
        });
    };
    logout = () => {
        this.store.dispatch({
            type: constants.BASE_ACTION_TYPES.CLEAR_STORE
        });
    };
    _dispatchError = (action, err, operation, error) => {
        return this.store.dispatch({
            type: ActionTypes[action], 
            payload: {...err, operation, trace: error}
        });
    };
}
