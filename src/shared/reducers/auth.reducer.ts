import { sendRequest } from 'src/shared/utils/api';
import { IUser } from 'src/shared/model/user.model';
import { FAILURE, REQUEST, SUCCESS } from './action-type.utils';

const initialState = {
    sessionFetched: false,
    user: undefined as IUser,
    isAuthenticated: false,
    loading: false,
    loginSuccess: false,
    JWTToken: undefined as string,
    loginError: false,
    account: undefined as IUser,
    errorMessage: undefined as string,
    redirectMessage: undefined as string,
    logoutUrl: undefined as string
};

export type AuthState = typeof initialState;

export const ACTION_TYPES = {
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
    CLEAR: 'auth/clear'
};

export default (state: AuthState = initialState, action): AuthState => {
    switch (action.TYPE) {
        case REQUEST(ACTION_TYPES.LOGIN):
            return {
                ...initialState,
                loading: true,
            }
        case FAILURE(ACTION_TYPES.LOGOUT):
            return {
                ...initialState,
                errorMessage: action.payload,
                loginError: true
            }
        case SUCCESS(ACTION_TYPES.LOGIN):
            return {
                ...state,
                loading: false,
                loginError: false,
                loginSuccess: true,
                isAuthenticated: true
            };
        case ACTION_TYPES.LOGOUT:
            return initialState;
        default: return state;
    }
}