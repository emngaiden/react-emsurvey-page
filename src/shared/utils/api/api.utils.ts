import axios from 'axios';
import { getApiData } from 'src/shared/utils/app';
import { IApi, getEndpoint } from 'src/shared/model/system/api.model';
import { IApiEndpoint } from 'src/shared/model/system/api-endpoint.model';

export const sendRequest = (an: string, en: string, g?: Object): Promise<any> => {
    const a: IApi = getApiData(an);
    const e: IApiEndpoint = getEndpoint(a, en);
    let m = e.method;
    if(m === 'post' || m === 'get' || m === 'put' || m === 'delete' || m === 'patch') {
        let d : ApiRequestData = buildData(a.url, e, g);
        switch(m) {
            case 'post':
                return axios.post(d.u, d.a);
            case 'get':
                return axios.get(d.u, d.o);
            case 'put':
                return axios.put(d.u, d.a, d.o);
            case 'delete':
                return axios.put(d.u, d.a, d.o);
            case 'patch':
                return axios.put(d.u, d.a, d.o)
            default: throw new Error('invalid method on API endpoint ' + an + '.' + en);
        }
    } else {
        throw new Error('invalid method on API endpoint ' + an + '.' + en);
    }
}

function buildData(u: string, e: IApiEndpoint, g: Object): ApiRequestData {
    return {
        u: buildUrl(u, e, g),
        a: buildArgs(e, g),
        o: buildOptions(e, g),
        og: g
    }
};

function buildUrl(u: string, e: IApiEndpoint, g: Object): string {
    u = `${u}/${e.path}`;
    if(g === undefined) return u;
    let paths = '';
    let variables = '?';
    for (const endpointArg of e.args) {
        const argName = endpointArg.name;
        const argValue = g[argName];
        if(argValue === undefined) throw new Error('Missing argument "' +  argName + '" during API endpoint "' + e.name + '" request');
        if(endpointArg.asPath) {
            if(typeof argValue === 'object') {
                paths += `/${escape(JSON.stringify(argValue))}`;
            } else if(typeof argValue === 'string') {
                paths += `/${escape(argValue)}`;
            } else {
                paths += `/${argValue}`;
            }
        } else if(endpointArg.asUrl) {
            if(typeof argValue === 'object') {
                variables += `${argName}=${escape(JSON.stringify(argValue))}&`;
            } else if(typeof argValue === 'string') {
                variables += `${argName}=${escape(argValue)}`;
            } else {
                variables += `${argName}=${argValue}`;
            }
        }
    }
    variables = variables.length > 1 ? variables.substring(0, variables.length - 1) : '';
    return `${u}${paths}${variables}`;
}

function buildArgs(e: IApiEndpoint, g: Object): Object {
    if(g === undefined) return undefined;
    let r = {};
    for(const endpointArg of e.args) {
        const  argName = endpointArg.name;
        const argValue = g[argName];
        if(argValue === undefined) throw new Error('Missing argument "' +  argName + '" during API endpoint "' + e.name + '" request');
        if(endpointArg.asBody) {
            if(typeof argValue === 'object') {
                r = {
                    ...r,
                    ...argValue
                };
            } else {
                r[argName] = argValue;  
            }
        }
    }
    return Object.keys(r).length < 1 ? undefined : r;
}

interface ApiRequestData {
    u: string,
    a: Object,
    o: Object,
    og: Object
}

function buildOptions(e: IApiEndpoint, g: Object): Object {
    // TODO: implement to create the options object
    return undefined;
}