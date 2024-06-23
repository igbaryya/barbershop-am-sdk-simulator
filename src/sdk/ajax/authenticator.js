import {BaseService} from './Base';

class AuthenticatorService {
    constructor(ServiceBase = BaseService) {
        this.serviceBase = ServiceBase; 
    }
    getGeoCodeByIp = () => {
        return this.serviceBase._ajaxGet('https://ipapi.co/json/'); 
    }
    getGeoCodeByIp2 = () => {
        return this.serviceBase._ajaxGet('https://extreme-ip-lookup.com/json/'); 
    }
}
export default new AuthenticatorService();
