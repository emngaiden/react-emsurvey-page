import axios from 'axios';
import { IApi } from '../model/api.model';
import { FAILURE, REQUEST, SUCCESS } from './action-type.utils';
import { getApiData } from '../utils/appsettings-utils';

const initialState = {
    data: 0,
    loading: false,
    apiData: undefined,
    error: undefined as string,
    apiSettingsData: undefined as IApi
};

export type BasicState = Readonly<typeof initialState>;

export const ACTION_TYPES = {
    INCREASE_DATA: "basic/increase_data",
    DECREASE_DATA: "basic/decrease_data",
    RESET: "basic/reset",
    REQUEST_API: "basic/request_api",
    READ_API_SETTINGS: "basic/reap_api_settings"
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

export const requestApi = () => ({
    type: ACTION_TYPES.REQUEST_API,
    payload: axios.get('https://cat-fact.herokuapp.com/facts')
});

export const readAppSettings = () => ({
    type: ACTION_TYPES.READ_API_SETTINGS,
    payload: getApiData('main')
});