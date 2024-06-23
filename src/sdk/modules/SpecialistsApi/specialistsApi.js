
import {createActionTypes} from '../../reduxBase';
import config from './specialists.config'
import LoginApi from '../LoginApi';
import FirebaseApi from '../FirebaseApi';
import * as selectors from './specialistsSelector';
import { ALL_SERCICES, ALL_WORKING_HOURS, FB_TABLES } from '../../commonUtils/constant';
import { error, success } from '../../commonUtils/responses';

export const ActionTypes = createActionTypes([
    'SPECIALISTS_ERROR'
]);

export default class SpecialistsApi {
    name = 'SpecialistsApi';

    constructor(store) {
        this.store = store;
        this.selectors = selectors;
        this.loginApi = new LoginApi(store);
        this.firebaseApi = new FirebaseApi(store).getInstance(); 
    }

    newSpecialist = async (uid, workingHours, services) => {
        try {
            if (!uid) {
                return error('NO_UID', 'UID Mandatory', `UID is mandatory to add new specialist`);
            }
            const [isExists, alreadySpecialist] = await Promise.all([
                this.firebaseApi.asyncRead(`${FB_TABLES.USERS}/${uid}`),
                this.firebaseApi.asyncRead(`${FB_TABLES.SPECIALISTS}/${uid}`),
            ])
            if (!isExists) {
                return error('NO_SUCH_USER', 'User not found', `No such user with UID ${uid} found`);
            }
            if (alreadySpecialist) {
                return error('SPECIALIST_EXISTS', 'Specialist already exists', `Specalist with UID ${uid} already defined as Specialist, You can update and not recreate`);
            }
            await this.firebaseApi.asyncWrite(`${FB_TABLES.SPECIALISTS}/${uid}`, {
                workingHours: workingHours || ALL_WORKING_HOURS,
                services: services || ALL_SERCICES,
                status: config.statuses.available
            });
            return success();
        } catch (err) {
            console.warn(err);
            return this._dispatchError(
                error('GENERAL_ERROR', 'Failed to add Specialist', `Failure, see trace`).error,
                'NEW_SPECIALIST',
                err
            )
        }
    };

    _dispatchError = (err, operation, trace) => {
        console.warn(`Operation: ${operation}`, trace || err);
        return this.store.dispatch({
            type: ActionTypes.SPECIALISTS_ERROR, 
            payload: {...err, operation, trace}
        });
    };
}
