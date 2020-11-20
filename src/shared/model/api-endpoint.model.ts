export interface IApiEndpoint {
    name: string;
    path: string;
    args?: string[];
    methods?: string[];
}