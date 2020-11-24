import { ILanguage } from 'src/shared/model/system/language.model';
import { IApiEndpoint } from 'src/shared/model/system/api-endpoint.model';
import { IApi } from 'src/shared/model/system/api.model';

const appconfig = require('../../../../appconfig.json');

export function getApiData(apiName: string): IApi {
    const r = validateAppSettings(true, 'apiSettings', 'api', apiName);
    const endpoints: IApiEndpoint[] = [];
    Object.keys(r.endpoints).forEach(key => {
        const value = r.endpoints[key]
        endpoints.push({
            name: key,
            path: value.path,
            args: value.args,
            method: value.method
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
    const r = validateAppSettings(true, 'apiSettings', 'api');
    const ret: IApi[] = [];
    Object.keys(r).forEach(k => {
        ret.push(getApiData(k));
    })
    return ret;
}

export function getAvailableLanguages(): ILanguage[] {
    const r = validateAppSettings(true, 'localeSettings', 'languages');
    const ret = [];
    Object.keys(r).forEach(k => {
        ret.push(r[k]);
    })
    return ret;
}

export function getDefaultLanguage(): ILanguage {
    const r = validateAppSettings(true, 'localeSettings', 'default');
    return validateAppSettings(true, 'localeSettings', 'languages')[r];
}

export function getLanguage(key: string): ILanguage {
    const r = validateAppSettings(false, 'localeSettings', 'languages', key)
    if(r === undefined) return undefined
    return r;
}

function validateAppSettings(throwErrorOnDeep, ...other: string[]): any {
    let d = appconfig;
    if (d === undefined) {
        throw new Error("No appconfig.json file found in project root directory.");
    }
    let m = '';
    for (const iterator of other) {
        d = d[iterator]
        m += iterator + '.';
        if (d === undefined) {
            if(throwErrorOnDeep) throw new Error(`Malformed appconfig.json file. No '${m}' property found`);
            return undefined;
        }
    }
    return d;
}