class ServiceBase {
    _ajaxPost = async (baseUrl, payload) => {
        let res = {};
        try {
            res = await this.send(baseUrl, 'POST', payload); 
        } catch (err) {
            res = err; 
        }
        return res; 
    }

    _ajaxGet = async (baseUrl) => {
        let res = {};
        try {
            res = await this.send(baseUrl, 'GET'); 
        } catch (err) {
            res = err; 
        }
        return res; 
    }
    
    send = async (baseUrl, method, payload = undefined) => {
        const response = await new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, baseUrl, true);
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                resolve(undefined);
            };
            xhr.send(payload);
        }); 
        return JSON.parse(response);
    }
}

export default new ServiceBase();

