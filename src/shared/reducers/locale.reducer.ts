import { getDefaultLanguage, getLanguage, getAvailableLanguages } from 'src/shared/utils/appconfig.utils';
import { createFileTree } from 'src/shared/utils/translation/translation.constants';

const dl = getDefaultLanguage();

export const ACTION_TYPES = {
    SET_LOCALE: 'locale/set_locale',
}

const initialState = {
    languageKey: dl.key,
    languageName: dl.name
}

export type LocaleState = typeof initialState;

export default (state: LocaleState = initialState, action): LocaleState => {
    switch(action.type) {
        case ACTION_TYPES.SET_LOCALE: {
            if(action.payload === undefined) {
                return state;
            } else {
                if(state.languageKey === action.payload.key) {
                    return state;
                }
                createFileTree(action.payload.key);
                return {
                    languageKey: action.payload.key,
                    languageName: action.payload.name
                }
            }
        }
        default: return state;
    }
}

export const setLocale = (key: string) => {
    return {
        type: ACTION_TYPES.SET_LOCALE,
        payload: getLanguage(key)
    }
};