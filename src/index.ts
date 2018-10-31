import "reflect-metadata";
import { MainBundle } from './api/bundle/DIBundle/MainBundle';
import { IHttpServer } from './base/http/services/IHttpServer';
import { ExpressRouteConfig } from './api/http/model/ExpressRouteConfig';

class Main {

    public static start = () => {

        let container = new MainBundle().configure();
        let server = container.get<IHttpServer>(IHttpServer);
        server.open(Number(process.env.PORT), new ExpressRouteConfig());
    }

}

Main.start();