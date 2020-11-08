import basic, {BasicState} from './basic';
import { combineReducers } from 'redux';


export interface IRootState {
    readonly basic: BasicState
}

const rootReducer = combineReducers<IRootState>({
    basic
});

export default rootReducer;
