import { sendRequest } from 'src/shared/utils/api';
import { IUser } from 'src/shared/model/user.model';
import { FAILURE, REQUEST, SUCCESS } from './action-type.utils';
import { cleanEntity } from 'src/shared/utils/entity.utils';

const initialState = {
    usersList: undefined as IUser[],
    user: undefined as IUser,
    creating: false,
    loading: false,
    updating: false,
    errorMessage: undefined
}

export type UsersState = typeof initialState;

export const ACTION_TYPES = {
    GET_USER: 'users/get_user',
    GET_USERS_LIST: 'users/get_users_list',
    CREATE_USER: 'users/create_user',
    UPDATE_USER: 'users/update_user'
}

export default (state: UsersState = initialState, action): UsersState => {
    switch(action.type) {
        case(REQUEST(ACTION_TYPES.GET_USER)):
            return {
                ...state,
                user: undefined,
                loading: true,
            };
        case(REQUEST(ACTION_TYPES.CREATE_USER)):
            return {
                ...state,
                creating: true,
                user: undefined
            };
        case(REQUEST(ACTION_TYPES.GET_USERS_LIST)):
            return {
                ...state,
                usersList: undefined,
                loading: true
            }
        case(REQUEST(ACTION_TYPES.UPDATE_USER)): 
            return {
                ...state,
                updating: true
            };
        case(FAILURE(ACTION_TYPES.GET_USER)):
        case(FAILURE(ACTION_TYPES.CREATE_USER)):
        case(FAILURE(ACTION_TYPES.GET_USERS_LIST)):
        case(FAILURE(ACTION_TYPES.UPDATE_USER)):
            return {
                ...state,
                loading: false,
                creating: false,
                updating: false,
                errorMessage: action.payload
            };
        case(SUCCESS(ACTION_TYPES.GET_USER)):
            return {
                ...state,
                loading: false,
                user: action.payload.data
            };
        case(SUCCESS(ACTION_TYPES.GET_USERS_LIST)):
            return {
                ...state,
                loading: false,
                usersList: action.payload.data
            };
        case(SUCCESS(ACTION_TYPES.CREATE_USER)):
            return {
                ...state,
                creating: false,
                user: action.payload.data
            };
        case(SUCCESS(ACTION_TYPES.UPDATE_USER)): 
            return {
                ...state,
                updating: false,
                user: action.payload.data
            };
        default: return state;
    }
};

export const getAllUsers = () => ({
    type: ACTION_TYPES.GET_USERS_LIST,
    payload: sendRequest('main', 'getUsers')
});

export const createUser = (user: IUser) => async dispatch => {
    await dispatch({
        type: ACTION_TYPES.CREATE_USER,
        payload: sendRequest('main', 'createUser', { user: cleanEntity(user) })
    });
    dispatch(getAllUsers());
};

export const getUser = (id: string) => ({
    type: ACTION_TYPES.GET_USER,
    payload: sendRequest('main', 'getUser', { id })
});

export const updateUser = (user: IUser) => async dispatch => {
    await dispatch({
        type: ACTION_TYPES.UPDATE_USER,
        payload: sendRequest('main', 'updateUser', { user })
    })
    dispatch(getAllUsers());
};
