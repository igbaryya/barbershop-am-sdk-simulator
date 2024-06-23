
import {createActionTypes} from '../../reduxBase';
import LoginApi from '../LoginApi';
import FirebaseApi from '../FirebaseApi';
import * as selectors from './usersSelector';
import { DEFAULT_AVATAR, FB_TABLES, GENDERS } from '../../commonUtils/constant';

export const ActionTypes = createActionTypes([
    'USER_INFO',
    'USER_ID',
    'USERS_ERROR'
]);

export default class UsersApi {
    name = 'UsersApi';

    constructor(store) {
        this.store = store;
        this.selectors = selectors;
        this.loginApi = new LoginApi(store);
        this.firebaseApi = new FirebaseApi(store).getInstance(); 
    }

    retrieveUser = async (uid) => {
        try {
            const user = await this.firebaseApi.asyncRead(`${FB_TABLES.USERS}/${uid}`);
            return user; 
        } catch (err) {
            console.warn(err);
            return null;
        }
       
    };

    initializeNewUser = async (user) => {
        const {uid, email, photoURL, phoneNumber, displayName, gender} = user; 
        const newUser = {
            displayName: displayName || phoneNumber,
            phoneNumber,
            email,
            avatar: photoURL || DEFAULT_AVATAR,
            gender: gender || GENDERS.MALE,
            books: [],
            registerTimestamp: this.firebaseApi.getServerTimestamp(),
            userUpdated: false,
            isAdmin: false
        };
        await this.firebaseApi.asyncWrite(`${FB_TABLES.USERS}/${uid}`, newUser);
    };

    _dispatchError = (action, err, operation, error) => {
        console.warn(`Operation: ${operation}`, error || err);
        return this.store.dispatch({
            type: ActionTypes[action], 
            payload: {...err, operation, trace: error}
        });
    };
}
