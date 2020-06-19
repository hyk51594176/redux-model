/* eslint-disable no-param-reassign */
import {
  createStore,
  applyMiddleware,
  Dispatch,
  combineReducers,
  Middleware,
} from 'redux';
import createRootModel from './createRootModel';
import createMiddleware from './createMiddleware';
import { Options, Model } from './interface';
import { createLogger } from 'redux-logger';

const defaultOptions = {
  separator: '/',
  reducers: {},
  middlewares: [] as Middleware[],
};
export default function <S = any> (
  models: Array<Model<S>>,
  options = defaultOptions as Options<S>,
) {
  const rootModel = createRootModel<S>(models, options.separator);
  const modelMiddleware = createMiddleware(rootModel);
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
    devtoolsFn =
      typeof window === 'object'
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION__
        : null;
  }

  return applyMiddleware<Dispatch, S>(
    ...middlewares,
  )(devtoolsFn ? devtoolsFn()(createStore) : createStore)(
    combineReducers<S>({
      ...rootModel.reducers,
      ...(options.reducers || {}),
    }),
  );
}
