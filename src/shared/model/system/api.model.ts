import { IApiEndpoint } from './api-endpoint.model';

export interface IApi {
    name?: string;
    url?: string;
    endpoints?: IApiEndpoint[];
}

export const getEndpoint = (api: IApi, endpointName: string): IApiEndpoint => {
    for (const iterator of api.endpoints) {
        if(iterator.name === endpointName) {
            return iterator;
        }
    }
}