import { RouteConfig } from '../model/RouteConfig';

export let IHttpServer = Symbol("IHttpServer");
export interface IHttpServer {

    open(port: number, routes: RouteConfig): void

}