import axios from 'axios';
import { IApi } from 'src/shared/model/api.model';
import { FAILURE, REQUEST, SUCCESS } from './action-type.utils';
import { getApiData, getAvailableLanguages, getDefaultLanguage } from 'src/shared/utils/appsettings-utils';
import { ILanguage } from 'src/shared/model/language.model';
import { buildApiUrl } from 'src/shared/utils/app-utils';

const initialState = {
    data: 0,
    loading: false,
    apiData: undefined,
    error: undefined as string,
    apiSettingsData: undefined as IApi,
    languages: undefined as ILanguage[],
    defaultLanguage: undefined as ILanguage
};

export type BasicState = Readonly<typeof initialState>;

export const ACTION_TYPES = {
    INCREASE_DATA: "basic/increase_data",
    DECREASE_DATA: "basic/decrease_data",
    RESET: "basic/reset",
    REQUEST_API: "basic/request_api",
    READ_API_SETTINGS: "basic/reap_api_settings",
    READ_LANGUAGES: "basic/read_languages",
    READ_DEFAULT_LANGUAGE: "basic/read_default_language"
}

export default (state: BasicState = initialState, action): BasicState => {
    switch(action.type) {
        case REQUEST(ACTION_TYPES.REQUEST_API): {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        }
        case FAILURE(ACTION_TYPES.REQUEST_API): {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        }
        case SUCCESS(ACTION_TYPES.REQUEST_API): {
            return {
                ...state,
                error: undefined,
                loading: false,
                apiData: action.payload
            }
        }
        case ACTION_TYPES.READ_LANGUAGES: {
            return {
                ...state,
                languages: action.payload
            }
        }
        case ACTION_TYPES.READ_DEFAULT_LANGUAGE: {
            return {
                ...state,
                defaultLanguage: action.payload
            }
        }
        case ACTION_TYPES.READ_API_SETTINGS: {
            return {
                ...state,
                apiSettingsData: action.payload
            }
        }
        case ACTION_TYPES.INCREASE_DATA: {
            return {
                ...state,
                data: state.data + 1
            }
        }
        case ACTION_TYPES.DECREASE_DATA: {
            return {
                ...state,
                data: state.data - 1
            }
        }
        case ACTION_TYPES.RESET: {
            return initialState;
        }
        default:
            return state;
    }
}

export const increaseData = () => ({
    type: ACTION_TYPES.INCREASE_DATA
});

export const decreaseData = () => ({
    type: ACTION_TYPES.DECREASE_DATA
});

export const reset = () => ({
    type: ACTION_TYPES.RESET
});

export const requestApi = () => {
    const apiData = getApiData('main');
    
    return {
        type: ACTION_TYPES.REQUEST_API,
        payload: axios.get(buildApiUrl(apiData, 'facts'))
    }
    
};

export const readAppSettings = () => ({
    type: ACTION_TYPES.READ_API_SETTINGS,
    payload: getApiData('main')
});

export const readLanguages = () => ({
    type: ACTION_TYPES.READ_LANGUAGES,
    payload: getAvailableLanguages()
});

export const readDefaultLanguage = () => ({
    type: ACTION_TYPES.READ_DEFAULT_LANGUAGE,
    payload: getDefaultLanguage()
})