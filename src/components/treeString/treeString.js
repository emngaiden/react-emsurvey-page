export function toTreeString(object, previousIdent = '', depth = 1) {
    if (typeof object === 'string') return "'" + object + "'";
    if (typeof object !== 'object') return object.toString();
    let ident = '';
    for (let index = 0; index < depth; index++) {
       ident += '    ';
    }
    let ret = '{\n';
    const keys = Object.keys(object);
    for (const key of keys) {
        ret += ident + key + ': ' + toTreeString(object[key], ident, depth + 1) + '\n';
    }
    ret += previousIdent + '}';
    return ret;
}