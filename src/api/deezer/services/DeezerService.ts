import { ISongService } from '../../http/songs/services/ISongService';
import { ArtistPayload } from '../../http/songs/data/Artist';
import { injectable } from 'inversify';
import { SongPayload } from '../../http/songs/data/SongPayload';
const DZ = require('node-deezer')

@injectable()
export class DeezerService implements ISongService {


    private appId: string;
    private url: string;
    private secret: string;
    deezer: any;

    constructor() {
        this.appId = process.env.APP_ID.trim();
        this.url = process.env.REDIRECT_URL.trim();
        this.secret = process.env.SECRET.trim();

        this.deezer = new DZ();
    }

    async login(): Promise<string> {

        let url = this.deezer.getLoginUrl(
            this.appId,
            this.url
        );

        return url;

    }
    createSession(code: string): Promise<string> {
        return new Promise<string>(
            (resolve, reject) => {
                this.deezer.createSession(
                    this.appId,
                    this.secret,
                    code,
                    (err: any, result: any) => {

                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(result.accessToken);

                    }

                );
            }
        );
    }
    artists(token: string): Promise<ArtistPayload[]> {

        return new Promise<ArtistPayload[]>(
            (resolve, reject) => {
                this.deezer.request(token,
                    {
                        resource: 'user/me/artists',
                        method: 'get'
                    },
                    (err: any, results: any) => {

                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve((results.data as ArtistPayload[]));

                    });
            }
        );


    }
    artist(id: number, token: string): Promise<ArtistPayload> {
        return new Promise<ArtistPayload>(
            (resolve, reject) => {
                this.deezer.request(token,
                    {
                        resource: `artist/${id}`,
                        method: 'get'
                    },
                    (err: any, results: any) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve((results as ArtistPayload));

                    });
            }
        );
    }

    songs(artist: ArtistPayload, token: string): Promise<SongPayload[]> {
        return new Promise<SongPayload[]>(
            (resolve, reject) => {
                this.deezer.request(token,
                    {
                        resource: `artist/${artist.id}/top`,
                        method: 'get'
                    },
                    (err: any, results: any) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve((results.data as SongPayload[]));

                    });
            }
        );
    }

}