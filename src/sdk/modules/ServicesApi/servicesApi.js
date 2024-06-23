
import {createActionTypes} from '../../reduxBase';
import LoginApi from '../LoginApi';
import FirebaseApi from '../FirebaseApi';
import * as selectors from './servicesSelector';
import {FB_TABLES, NO_IMG } from '../../commonUtils/constant';
import { error, success } from '../../commonUtils/responses';

export const ActionTypes = createActionTypes([
    'SERVICES_ERROR',
    'UPDATE_SERVICES',
]);

export default class ServicesApi {
    name = 'ServicesApi';

    constructor(store) {
        this.store = store;
        this.selectors = selectors;
        this.loginApi = new LoginApi(store);
        this.firebaseApi = new FirebaseApi(store).getInstance(); 
        this.loadServices();
    }

    newService = async (svcDisplayName, svcCost, svcDuration, svcDescription, svcIcon = NO_IMG) => {
        try {
            if (!svcDisplayName) {
                return error('MANDATORY_INPUT', 'Cannot add new Service without displayname')
            }
            if (!svcDuration) {
                return error('MANDATORY_INPUT', 'Cannot add new Service without duration')
            }
            if (Number.isNaN(Number(svcCost))) {
                return error('INVALID_INPUT', `${svcCost} value cannot be as Cost, Number is required`)
            }
            if (Number.isNaN(Number(svcDuration))) {
                return error('INVALID_INPUT', `${svcDuration} value cannot be as Duration, Number is required`)
            }
            const svcId = await this.firebaseApi.asyncPush(`${FB_TABLES.SERVICES}`, {
                cost: Number(`${svcCost || '0.00'}`).toFixed(2),
                displayName: svcDisplayName, 
                duration: Number(svcDuration),
                description: svcDescription ?? svcDisplayName,
                icon: svcIcon,
                creationTimestamp: this.firebaseApi.getServerTimestamp()
            });
            return {
                ...success(),
                serviceId: svcId
            }
        } catch (err) {
            console.warn(err);
            return this._dispatchError(
                error('GENERAL_ERROR', 'Failed to add Service', `Failure, see trace`).error,
                'NEW_SERVICE',
                err
            )
        }
    };

    deleteService = async (svcId) => {
        if (!svcId) {
            return error('MANDATORY_INPUT', 'Service Id is manadatory to remove Service by Id')
        }
        const services = await this.getAllServices(); 
        if (!services[svcId]) {
            return error('INVALID_INPUT', `No such Service with id ${svcId}`)
        }
        await this.firebaseApi.asyncDelete(`${FB_TABLES.SERVICES}/${svcId}`)
        return success(); 
    }

    updateService = async (svcId, svcDetails) => {
        if (!svcId) {
            return error('MANDATORY_INPUT', 'Service Id is manadatory to remove Service by Id')
        }
        if (!svcDetails) {
            return error('MANDATORY_INPUT', 'Service Details are manadatory to update Service')
        }
        if (typeof svcDetails !== 'object') {
            return error('INVALID_INPUT', `Input ${svcDetails} must be an object`)
        }
        const services = await this.getAllServices(); 
        if (!services[svcId]) {
            return error('INVALID_INPUT', `No such Service with id ${svcId}`)
        }
        await this.firebaseApi.asyncUpdate(`${FB_TABLES.SERVICES}/${svcId}`, svcDetails)
    }

    loadServices = async () => {
        if (typeof this.servicesHID === 'function') {
            this.servicesHID(); 
        }
        this.servicesHID = await this.firebaseApi.registerCall(`${FB_TABLES.SERVICES}`, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const services = Object.keys(data).map((svcId) => {
                    return {
                        id: svcId,
                        ...data[svcId]
                    }
                })
                this.store.dispatch({
                    type: ActionTypes.UPDATE_SERVICES,
                    payload: services
                })
            } else {
                this.store.dispatch({
                    type: ActionTypes.UPDATE_SERVICES,
                    payload: []
                })
            }
        });
    }

    getServices = () => this.selectors.servicesSelector(this.store.getState()) || []

    _dispatchError = (err, operation, trace) => {
        console.warn(`Operation: ${operation}`, trace || err);
        return this.store.dispatch({
            type: ActionTypes.SPECIALISTS_ERROR, 
            payload: {...err, operation, trace}
        });
    };
}
