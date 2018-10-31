export interface IContext {
    get<T>(clazz: symbol | string): T;
}