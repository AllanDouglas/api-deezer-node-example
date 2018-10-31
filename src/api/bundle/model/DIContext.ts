import { IContext } from '../../../base/bundle/model/IContext';
import { Container } from 'inversify';

export class DIContext implements IContext {
    private container: Container;

    constructor(context: Container) {
        this.container = context;

    }

    get<T>(clazz: symbol | string): T {
        return this.container.get<T>(clazz);
    }

}