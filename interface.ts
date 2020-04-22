import { Store, Reducer, AnyAction } from 'redux';

declare module 'redux' {
  export interface Dispatch {
    (type: string, params?: any): Promise<any>;
  }
  export interface Store<S> {
    commit(type: string, params: any): void;
  }
}

export interface Reducers<S, T extends keyof S> {
  [key: string]: (state: S[T], data: any, rootState: S) => S[T] | S;
}
export interface Actions<S> {
  [key: string]: (store: Store<S>, data: any) => Promise<any>;
}

export interface Model<S, T extends keyof S = keyof S> {
  namespace: T;
  state: S[T];
  reducers: Reducers<S, T> | {};
  actions: Actions<S> | {};
}

export interface Options {
  separator: string;
}
export interface Options {
  separator: string;
}

export interface RootModel<S> {
  [key: string]: {
    model: Model<S>;
    reducer: Reducer<S, AnyAction>;
  };
}
