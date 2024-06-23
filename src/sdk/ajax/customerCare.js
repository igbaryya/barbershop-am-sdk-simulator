import {BaseService} from './Base';

class CustomerCareServices {
    constructor(ServiceBase = BaseService) {
        this.serviceBase = ServiceBase;
    }

    retrieveArabicLanguage = () => {
        return this.serviceBase._ajaxGet('https://AboMen3m.web.app/language/ar.json'); 
    }
}
export default new CustomerCareServices();
