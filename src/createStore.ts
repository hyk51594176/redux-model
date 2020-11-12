/*
 * @Author: 韩玉凯
 * @Date: 2020-04-29 15:48:14
 * @LastEditors: 韩玉凯
 * @LastEditTime: 2020-09-29 11:29:30
 * @FilePath: /redux-model/src/createStore.ts
 */

/* eslint-disable no-param-reassign */
import { createStore, applyMiddleware, combineReducers, Middleware, Dispatch } from 'redux';
import createRootModel from './createRootModel';
import createMiddleware from './createMiddleware';
import { Options, Model, State } from './interface';
import { createLogger } from 'redux-logger';

const defaultOptions = {
  separator: '/',
  reducers: {},
  loadingModel: false,
  middlewares: [] as Middleware[],
};


export default function <S = any> (
  models: Array<Model<S>>, options = defaultOptions as Options<S>,
) {
  const rootModel = createRootModel(models, options.separator, options.loadingModel);
  const modelMiddleware = createMiddleware(rootModel, options.loadingModel);
  const middlewares = [modelMiddleware, ...(options.middlewares || [])];
  let devtoolsFn;
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(
      createLogger({
        level: 'log',
        collapsed: true,
        colors: {
          title: () => '#409EFF',
          prevState: () => '#909399',
          action: () => '#E6A23C',
          nextState: () => '#67C23A',
          error: () => '#F56C6C',
        },
      }),
    );
    devtoolsFn = typeof window === 'object' ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ : null;
  }

  return applyMiddleware<Dispatch, State<S>>(...middlewares)(devtoolsFn ? devtoolsFn()(createStore) : createStore)(
    combineReducers<State<S>>({
      ...rootModel.reducers,
      ...options.reducers,
    }),
  );
}
