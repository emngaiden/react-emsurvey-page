export class PutterValidator {
    message: string;
    fn: (any?: any) => boolean;
    constructor(fn?: (any?) => boolean, message?: string) {
        if(fn === undefined) {
            fn = () => true;
        } else {
            this.fn = fn;
        }
        if(message === undefined) {
            this.message = 'Invalid input';
        } else {
            this.message = message;
        }
    }
}

export function verifyArray(d: Array<any>): boolean {
    return verifyObject(d) && d.length > 0;
}
  
export function verifyObject(d: Object): boolean {
    return d !== undefined && d !== null;
}
  
export function verifyString(d: string): boolean {
    return verifyObject(d) && d !== '' && !d.match(/\s+/g);
}

export function verifyNumber(d: number) {
    return verifyObject(d) && !Number.isNaN(d);
}

export const required: PutterValidator = new PutterValidator(v => {
    switch(typeof v) {
        case 'string':
            return verifyString(v);
        case 'number':
            return verifyNumber(v);
        default: 
            if(Array.isArray(v)) {
                return verifyArray(v);
            } else{
                return verifyObject(v);
            }
    }
}, "This field is required");

export const email: PutterValidator = new PutterValidator((v: string) => {
    if(!verifyString(v)) return false;
    const m = v.match(/^([0-9]|[a-z]|[\-_])+@([0-9]|[a-z]|[\-_])+.([0-9]|[a-z]|[\-_])+(.([0-9]|[a-z])+)+$/gi)
    if(Array.isArray(m)) {
        return true
    } else {
        return m
    }
}, "Invalid email address")