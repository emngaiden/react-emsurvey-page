import { IApiEndpoint } from '../model/api-endpoint.model';
import { IApi } from '../model/api.model';

const appconfig = require('../../../appconfig.json');

export function getApiData(apiName: string): IApi {
    if (appconfig === undefined) {
        throw new Error("No appconfig.json file found in project root directory.");
    }
    if (appconfig['apiSettings'] === undefined) {
        throw new Error("Malformed appconfig.json file. No 'apiSettings' property found.");
        
    }
    if (appconfig['apiSettings']['api'] === undefined) {
        return undefined;
    }
    const r = appconfig['apiSettings']['api'][apiName];
    const endpoints: IApiEndpoint[] = [];
    Object.keys(r.endpoints).forEach(key => {
        const value = r.endpoints[key]
        endpoints.push({
            name: key,
            path: value.path,
            args: value.args,
            methods: value.methods
        });
    })
    const ret: IApi = {
        name: apiName,
        url: r.url,
        endpoints
    };
    return ret;
}

export function getAllApiData(): IApi[] {
    if (appconfig === undefined) {
        throw new Error("No appconfig.json file found in project root directory.");
    }
    if (appconfig['apiSettings'] === undefined) {
        throw new Error("Malformed appconfig.json file. No 'apiSettings' property found.");
        
    }
    if (appconfig['apiSettings']['api'] === undefined) {
        return [];
    }
    const ret: IApi[] = [];
    Object.keys(appconfig['apiSettings']['api']).forEach(k => {
        ret.push(getApiData(k));
    })
    return ret;
}