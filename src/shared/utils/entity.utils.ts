import { verifyString } from './app.utils';

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