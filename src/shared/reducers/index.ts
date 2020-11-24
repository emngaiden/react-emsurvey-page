import locale, { LocaleState } from './locale.reducer';
import users, { UsersState } from './users.reducer';

import { combineReducers } from 'redux';


export interface IRootState {
    readonly locale: LocaleState;
    readonly users: UsersState;
}

const rootReducer = combineReducers<IRootState>({
    locale,
    users
});

export default rootReducer;
