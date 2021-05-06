import locale, { LocaleState } from './locale.reducer';
import users, { UsersState } from './users.reducer';
import auth, { AuthState } from './auth.reducer';

import { combineReducers } from 'redux';


export interface IRootState {
    readonly locale: LocaleState;
    readonly users: UsersState;
    readonly auth: AuthState;
}

const rootReducer = combineReducers<IRootState>({
    locale,
    users,
    auth
});

export default rootReducer;
