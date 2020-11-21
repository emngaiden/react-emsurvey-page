import { tree } from './translation.constants';

export function translate(label: string, args?: object, fallback = `translation for string ${label} not found`): string {
    if(tree === undefined) return '';
    const spl = label.split('.');
    let r = tree;
    let l = spl.length;
    for (let i = 0; i < l; i++) {
        const element = spl[i];
        r = r[element];
        if(r === undefined) return fallback;
    }
    if(args === undefined) return r;
    return replaceArgs(r, args);
}

function replaceArgs(st: string, a: Object): string {
    const kl = Object.keys(a);
    if(kl.length < 1) return st;
    const ob = '{%', cb = '%}';
    var i0 = st.indexOf(ob);
    while(i0 !== -1) {
        var i1 = st.indexOf(cb);
        if(i1 === -1) break;
        var an = st.substring(i0 + 2, i1);
        var rs = a[an];
        if(rs === undefined) rs = 'undefined-argument:' + an;
        st = st.substring(0, i0) + rs + st.substring(i1 + 2);
        i0 = st.indexOf(ob);
    }
    return st;
}

