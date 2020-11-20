import { IApiEndpoint } from './api-endpoint.model';

export interface IApi {
    name?: string;
    url?: string;
    endpoints?: IApiEndpoint[];
}