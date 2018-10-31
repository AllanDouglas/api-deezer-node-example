import { IBundle } from '../../../base/bundle/service/IBundle';
import { IContext } from '../../../base/bundle/model/IContext';
import { DIContext } from '../model/DIContext';
import { Container } from 'inversify';
import { IHttpServer } from '../../../base/http/services/IHttpServer';
import { ExpressServer } from '../../http/services/ExpressServer';
import { ISongService } from '../../http/songs/services/ISongService';
import { DeezerService } from '../../deezer/services/DeezerService';

export class MainBundle implements IBundle {
    private continer: DIContext;

    configure(): IContext {

        let container = new Container();

        container.bind<IHttpServer>(IHttpServer).to(ExpressServer);
        container.bind<ISongService>(ISongService).to(DeezerService).inSingletonScope();

        this.continer = new DIContext(container);
        return this.continer;
    }

}