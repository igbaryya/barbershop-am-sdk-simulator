import {initializeApp} from 'firebase/app';
import {Timestamp} from 'firebase/firestore';
import {getDatabase, ref, child, get, set, push, update, remove, onValue, limitToLast, query, orderByChild, equalTo, startAt, endAt} from 'firebase/database';
import * as auth from 'firebase/auth';
import {getDownloadURL, getStorage, uploadBytes, ref as storageRef} from 'firebase/storage';

import {createActionTypes} from '../../reduxBase';
import * as selectors from './firebaseSelector';
import {responses} from '../../commonUtils';
import config from './firebase.config'; 

export const ActionTypes = createActionTypes([
    'FB_IS_updateIndicator',
    'UPDATE_MESSAGES',
    'UPDATE_LANG'
]);

export default class FirebaseApi {
    name = 'FirebaseApi';
    constructor(store) {
        const instance = this.constructor.instance; 
        if (instance) {
            return instance;
        }
        this.selectors = selectors;
        this.responses = responses; 
        this.store = store; 
        this.constructor.instance = this;
        this.firebase = null;
        this.setFBInstance();
    }

    setFBInstance = () => {
        this.authenticated();
    };

    getInstance = () => {
        return this.constructor.instance; 
    };

    getState = () => {
        return this.selectors.sliceSelector(this.store.getState());
    };

    asyncRead = async (root) => {
        const snapshot = await get(child(this.getDataBaseRef(), root));
        if (snapshot.exists()) {
            return snapshot.val();
        }
        return null;
    };

    asyncWrite = async (root, childs) => {
        await set(child(this.getDataBaseRef(), root), childs);
    };

    asyncPush = async (root, childs) => {
        const res = await push(child(this.getDataBaseRef(), root), childs);
        return res.key;
    };

    asyncUpdate = async (root, nameValue) => {
        await update(child(this.getDataBaseRef(), root), nameValue);
    };

    asyncDelete = async (root) => {
        await remove(child(this.getDataBaseRef(), root));
    };

    registerCall = (path, callback = () => {}, limit, orderBy, equalsTo) => {
        const dbRef = this.getDataBaseRef(path);
        const queries = []; 
        if (limit) {
            queries.push(limitToLast(limit));
        }
        if (orderBy) {
            queries.push(orderByChild(orderBy));
        }
        if (equalsTo) {
            queries.push(equalTo(equalsTo));
        }
        if (queries.length) {
            return onValue(query(dbRef, ...queries), callback);
        }
        return onValue(dbRef, callback);
    };

    getDataBaseRef = (path) => {
        const realtimeDB = getDatabase(this.firebase);
        return ref(realtimeDB, path);
    };
    
    getAuthRef = () => {
        return this.auth;
    };
    
    authenticated = () => {
        if (this.firebase == null) {
            this.firebase = initializeApp(config.firebaseAuthentication);
            this._updateIndicator(!!this.firebase);
            this.auth = auth.initializeAuth(this.firebase, {
                persistence: auth.browserLocalPersistence,
                popupRedirectResolver: auth.browserPopupRedirectResolver
            });
        }
    };

    isAuthenticated = () => {
        return this.selectors.isAuthenticated(this.store.getState());
    };

    getServerTimestamp = () => {
        return Timestamp.now();
    };

    asyncStorageUpload = async (path, blob) => {
        const result = await uploadBytes(this.getStorageRef(path), blob); 
        return result;
    };

    getStorageRef = (path, bucketURI) => {
        return storageRef(getStorage(this.firebase, bucketURI), path);
    };

    getDownloadURL = async (path) => {
        const res = await getDownloadURL(this.getStorageRef(path));
        return res;
    };
    
    selectLanguage = (lang) => {
        this.store.dispatch({
            type: ActionTypes.UPDATE_LANG, 
            payload: lang
        });
    };

    loadLanguagesMessages = async (lang = 'AR') => {
        this.selectLanguage(lang);
        const messages = await this.asyncRead(`Language/${lang}`);
        this.store.dispatch({
            type: ActionTypes.UPDATE_MESSAGES, 
            payload: messages
        });
    };

    getMessages = () => {
        return this.selectors.getMessages(this.store.getState()) || {};
    };

    getLanguage = () => {
        return this.selectors.getLanguage(this.store.getState());
    };

    searchOnce = async (root, key, value) => {
        const dbRef = this.getDataBaseRef(root);
        const snapshot = await get(query(dbRef, orderByChild(key), startAt(value), endAt(`${value}\uf8ff`)));
        if (snapshot.exists()) {
            return snapshot.val();
        }
        return null;
    };


    _updateIndicator = (indc) => {
        this.store.dispatch({
            type: ActionTypes.FB_IS_updateIndicator, 
            payload: indc
        });
    };
}
