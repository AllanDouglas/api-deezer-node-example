import { RouteConfig } from '../../../base/http/model/RouteConfig';
import { Request, Response } from 'express'
import { ISongService } from '../songs/services/ISongService';
import { ArtistPayload } from '../songs/data/Artist';

const DZ = require('node-deezer')

export class ExpressRouteConfig implements RouteConfig {
    
    private controller: ISongService;

    init(app: any, controller: ISongService): void {
        this.controller = controller;

        // index
        app.get('/', (req: Request, res: Response) => {
            res.send("Hello, is it me you're looking for?");
        })

        app.get('/login', async (req: Request, res: Response) => {

            let url = await this.controller.login();

            res.send({
                login_url: url
            });

        })

        app.get('/callback', async (req: Request, res: Response) => {
            if (req.query.code) {

                try {
                    let token = await this.controller.createSession(req.query.code);

                    res.send({
                        accessToken: token
                    });

                } catch (err) {
                    res.send("you can't login :(");
                }

            }
        });

        app.get('/artists', async (req: Request, res: Response) => {

            try {
                let token = this.getToken(req);

                let artists = await this.controller.artists(token);

                res.send({
                    data: artists
                });

            } catch (err) {
                res.send('invalid request: ' + err);
            }


        });

        app.get('/artist/:id', async (req: Request, res: Response) => {

            try {
                let token = this.getToken(req);

                let artist = await this.controller.artist(Number(req.params.id), token);

                res.send({
                    data: artist
                });

            } catch (err) {
                res.send('invalid request: ' + err);
            }
        });

        app.get('/artist/:id/songs', async (req: Request, res: Response) => {

            try {
                let token = this.getToken(req);

                let artist = await this.controller.songs({ id: req.params.id } as ArtistPayload, token);

                res.send({
                    data: artist
                });

            } catch (err) {
                res.send('invalid request: ' + err);
            }
        })


    }


    private getToken(req: Request) {
        let auth = (req.header('authorization') as string);
        if (!auth) {
            throw "there no token";
        }
        let token = auth.split(' ')[1];
        return token;
    }
}