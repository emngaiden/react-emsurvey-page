import { ILanguage } from 'src/shared/model/language.model';
import { IApiEndpoint } from 'src/shared/model/api-endpoint.model';
import { IApi } from 'src/shared/model/api.model';

const appconfig = require('../../../appconfig.json');

export function getApiData(apiName: string): IApi {
    const r = validateAppSettings(['apiSettings', 'api', apiName]);
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
    const r = validateAppSettings(['apiSettings', 'api']);
    const ret: IApi[] = [];
    Object.keys(r).forEach(k => {
        ret.push(getApiData(k));
    })
    return ret;
}

export function getAvailableLanguages(): ILanguage[] {
    const r = validateAppSettings(['translationSettings', 'languages']);
    const ret = [];
    Object.keys(r).forEach(k => {
        ret.push(r[k]);
    })
    return ret;
}

export function getDefaultLanguage(): ILanguage {
    const r = validateAppSettings(['translationSettings', 'default'], false);
    if(r === undefined) return undefined;
    return validateAppSettings(['translationSettings', 'languages'])[r];
}

function validateAppSettings(other = [], throwErrorOnDeep = true): any {
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