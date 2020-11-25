import { verifyString } from 'src/shared/utils/app';

export const cleanEntity = (e: any) => {
    const r = {...e};
    Object.keys(r).forEach(k => {
        const v = r[k];
        if(!verifyString(v)) {
            delete r[k];
            return ;
        }
        if(typeof v === 'object') {
            const i = v['id'];
            if(verifyString(i)) delete v['id'];
        }
    });
    return r;
};

export const arrayToObject = (a: object[], k: string): {} => {
    const r = {};
    for (const ai of a) {
        const kv = ai[k];
        if(kv === undefined) {
            throw Error('Missing field ' + k + ' for object mapping');
        }
        r[kv] = {
            ...ai
        }
    }
    return r;
};