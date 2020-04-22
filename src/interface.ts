import { ReducersMapObject, AnyAction, Dispatch, Middleware } from 'redux';

declare module 'redux' {
  export interface Dispatch {
    (type: string, params?: any): Promise<any>;
  }
}

export interface Reducers<S> {
  [key: string]: (state: S, data: any) => S;
}
export interface ActionStoreAPi<S> {
  dispatch: Dispatch;
  getState(): S;
  commit(type: string, payload: any): void;
}
export interface Actions<S> {
  [key: string]: (store: ActionStoreAPi<S>, data: any) => Promise<any>;
}
export interface Model<S = any, K extends keyof S = any> {
  namespace: K;
  state: S[K];
  reducers?: Reducers<S[K]>;
  actions?: Actions<S>;
}
export interface RootModel<S=any> {
  separator: string;
  state: S;
  reducers: ReducersMapObject<S, AnyAction>;
  actions: {
    [K in keyof S]: Actions<S>;
  };
}

export interface Options<S> {
  separator: string;
  reducers: ReducersMapObject<S, AnyAction>;
  middlewares: Array<Middleware<any, S, any>>;
}
