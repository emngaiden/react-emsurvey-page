import { IApiArgument } from './api-argument.model';

export interface IApiEndpoint {
    name?: string;
    path?: string;
    args?: IApiArgument[];
    method?: string;
}