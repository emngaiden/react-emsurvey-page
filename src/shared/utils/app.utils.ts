export function isPromise(p) {
    return p && Object.prototype.toString.call(p) === "[object Promise]";
}

export function verifyArray(d: Array<any>): boolean {
    return verifyObject(d) && d.length > 0;
}

export function verifyObject(d: Object): boolean {
    return d !== undefined && d !== null;
}

export function verifyString(d: string) {
    return verifyObject(d) && d !== '' && !d.match(/\s*/g);
}