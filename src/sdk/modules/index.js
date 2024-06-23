import FirebaseApi, {
    config as FirebaseConfig,
    reducer as FirebaseReducer
} from './FirebaseApi';
import UsersApi, {
    config as UsersConfig,
    reducer as UsersReducer
} from './UsersApi';
import LoginApi, {
    config as LoginConfig,
    reducer as LoginReducer
} from './LoginApi';
import SpecalistsApi, {
    config as SpecalistsConfig,
    reducer as SpecalistsReducer
} from './SpecialistsApi';
import ServicesApi, {
    config as ServicesConfig,
    reducer as ServicesReducer
} from './ServicesApi';
const modules = {

    [FirebaseConfig.apiName]: {
        reducer: FirebaseReducer,
        class: FirebaseApi
    },
    [LoginConfig.apiName]: {
        reducer: LoginReducer,
        class: LoginApi
    },
    [UsersConfig.apiName]: {
        reducer: UsersReducer,
        class: UsersApi
    },
    [SpecalistsConfig.apiName]: {
        reducer: SpecalistsReducer,
        class: SpecalistsApi
    },
    [ServicesConfig.apiName]: {
        reducer: ServicesReducer,
        class: ServicesApi
    }
};

export default modules;
