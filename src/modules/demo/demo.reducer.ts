import axios from 'axios';
import { IApi } from 'src/shared/model/api.model';
import { FAILURE, REQUEST, SUCCESS } from 'src/shared/reducers/action-type.utils';
import { getApiData, getAvailableLanguages, getDefaultLanguage } from 'src/shared/utils/appsettings-utils';
import { ILanguage } from 'src/shared/model/language.model';
import { buildApiUrl } from 'src/shared/utils/app-utils';
import { ACTION_TYPES as LOCALE_ACTION_TYPES } from 'src/shared/reducers/locale.reducer';

const initialState = {
    data: 0,
    loading: false,
    apiData: undefined,
    error: undefined as string,
    apiSettingsData: undefined as IApi,
    languages: undefined as ILanguage[],
    defaultLanguage: undefined as ILanguage
};

export type DemoState = Readonly<typeof initialState>;

export const ACTION_TYPES = {
    INCREASE_DATA: "demo/increase_data",
    DECREASE_DATA: "demo/decrease_data",
    RESET: "demo/reset",
    REQUEST_API: "demo/request_api",
    READ_API_SETTINGS: "demo/reap_api_settings",
    READ_LANGUAGES: "demo/read_languages",
    READ_DEFAULT_LANGUAGE: "demo/read_default_language",
}

export default (state: DemoState = initialState, action): DemoState => {
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
});

export const switchLocale = () => (dispatch, getState) => {
    const actualLanguageKey = getState().locale.languageKey;
    const languages = getAvailableLanguages();
    let item = languages[Math.floor(Math.random() * languages.length)];
    while(item.key === actualLanguageKey) {
        item = languages[Math.floor(Math.random() * languages.length)];
    };
    return dispatch({
        type: LOCALE_ACTION_TYPES.SET_LOCALE,
        payload: item
    });
};