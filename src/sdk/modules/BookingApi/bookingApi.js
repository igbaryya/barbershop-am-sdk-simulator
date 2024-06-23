
import {createActionTypes} from '../../reduxBase';
import LoginApi from '../LoginApi';
import FirebaseApi from '../FirebaseApi';
import * as selectors from './bookingSelector';

export const ActionTypes = createActionTypes([
    'SERVICES_ERROR',
    'UPDATE_SERVICES',
]);

export default class BookingApi {
    name = 'BookingApi';

    constructor(store) {
        this.store = store;
        this.selectors = selectors;
        this.loginApi = new LoginApi(store);
        this.firebaseApi = new FirebaseApi(store).getInstance(); 
    }

    availableSlots = async (specialistId) => {
        
    }
    bookService = async (svcId, specialistId, date, time) => {

    }
    _dispatchError = (err, operation, trace) => {
        console.warn(`Operation: ${operation}`, trace || err);
        return this.store.dispatch({
            type: ActionTypes.SPECIALISTS_ERROR, 
            payload: {...err, operation, trace}
        });
    };
}
