const enum StorageType { SESSION, LOCAL }

const getStorage = (type: StorageType): Storage => {
    if (type === StorageType.SESSION) {
        return window.sessionStorage;
    } else {
        return window.localStorage;
    }
}

const setItem = (type: StorageType) => (key: string, value: any) => {
    getStorage(type).setItem(key, value);
}

const getItem = (type: StorageType) => (key: string, fallback?: any) => {
    const v = getStorage(type).getItem(key);
    try {
        return !v || v === 'undefined' ? fallback : JSON.parse(v);
    }catch (e) {
        return v;
    }
}

const removeItem = (type: StorageType) => (key: string) => {
    getStorage(type).removeItem(key);
}

type getItemType = (key: string, defaultVal?: any) => any;
type setItemType = (key: string, value: any) => void;
type removeItemType = (key: string) => void;

interface IStorageAPI {
    get: getItemType;
    set: setItemType;
    remove: removeItemType;
}
  
interface IStorageService {
    session: IStorageAPI;
    local: IStorageAPI;
}
  
export const Storage: IStorageService = {
    session: {
        get: getItem(StorageType.SESSION),
        set: setItem(StorageType.SESSION),
        remove: removeItem(StorageType.SESSION)
    },
    local: {
        get: getItem(StorageType.LOCAL),
        set: setItem(StorageType.LOCAL),
        remove: removeItem(StorageType.LOCAL)
    }
};