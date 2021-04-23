/*
 * @Author:
 * @Date: 2020-08-13 13:57:33
 * @LastEditors: 韩玉凯
 * @LastEditTime: 2020-09-29 14:07:32
 * @FilePath: /redux-model/src/interface.ts
 */
import { ReducersMapObject, Dispatch, Middleware, Action } from 'redux';

declare module 'redux' {
  export interface Dispatch {
    (type: string, params?: any): Promise<any>;
  }
}
export interface ModelAction extends Action {
  payload: any;
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

export interface RootModel<S = any> {
  separator: string;
  state: S;
  reducers: ReducersMapObject<S, ModelAction>;
  actions: {
    [K in keyof S]: Actions<S>;
  };
}

export interface Options<S> {
  separator: string;
  reducers: ReducersMapObject<S, ModelAction>;
  middlewares: Array<Middleware<any, S, any>>;
  loadingModel?: boolean;
}

export interface Loading<S> {
  loading: {
    [K in keyof S]: {
      [T in keyof Model<S, K>['actions']]: number;
    };
  } & { globalLoading: 0 };
}

export type State<S> = S & Loading<S>;

export const defineModel = <S = any, K extends keyof S = any>(data: Model<S, K>) => data;
