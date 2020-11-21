// Demo reducer, remove on prod
import demo, { DemoState } from 'src/modules/demo/demo.reducer';
// ----------------------------
import locale, { LocaleState } from './locale.reducer';

import { combineReducers } from 'redux';


export interface IRootState {
    // Demo reducer, remove on prod
    readonly demo: DemoState;
    // ----------------------------
    readonly locale: LocaleState;
}

const rootReducer = combineReducers<IRootState>({
    // Demo reducer, remove on prod
    demo,
    // ----------------------------
    locale
});

export default rootReducer;
