import { ISongService } from '../../../api/http/songs/services/ISongService';

export abstract class RouteConfig {

    abstract init(app: any, controller: ISongService): void;
}