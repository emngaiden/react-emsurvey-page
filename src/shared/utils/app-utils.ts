import { IApiEndpoint } from 'src/shared/model/api-endpoint.model';
import { IApi } from 'src/shared/model/api.model';

export function isPromise(p) {
    return p && Object.prototype.toString.call(p) === "[object Promise]";
}

export function buildApiUrl(api: IApi, endpointName: string): string {
    let e: IApiEndpoint;
    for (const endpoint of api.endpoints) {
        if(endpointName === endpoint.name) {
            e = endpoint;
            break;
        }
    }
    if(e !== undefined) {
        return `${api.url}/${e.path}`
    }
    return `${api.url}`
}