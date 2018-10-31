import { ArtistPayload } from '../data/Artist';
import { SongPayload } from '../data/SongPayload';

export let ISongService = Symbol('ISongService');

export interface ISongService {

    login(): Promise<string>;
    createSession(code: string): Promise<string>;
    artists(token: string): Promise<ArtistPayload[]>;
    artist(id: number, token: string): Promise<ArtistPayload>;
    songs(artist: ArtistPayload, token: string): Promise<SongPayload[]>;

}