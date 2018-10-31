import { IHttpServer } from '../../../base/http/services/IHttpServer';
import * as Express from 'express';
import { RouteConfig } from '../../../base/http/model/RouteConfig';
import { injectable, inject } from "inversify";
import { ISongService } from '../songs/services/ISongService';

@injectable()
export class ExpressServer implements IHttpServer {
    private songService: ISongService;

    constructor(
        @inject(ISongService) service: ISongService
    ) {
        this.songService = service;
    }

    public open(port: number, routes: RouteConfig): void {
        let express = Express();
        
        routes.init(express, this.songService);
        
        express.listen(port, () => {
            console.log(
                "App is running on %d", port
            )
        });
    }

}