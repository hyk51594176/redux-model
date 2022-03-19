/*
 * @Author: 韩玉凯
 * @Date: 2020-04-29 15:48:14
 * @LastEditors: 韩玉凯
 * @LastEditTime: 2020-09-29 11:29:30
 * @FilePath: /redux-model/src/createStore.ts
 */

/* eslint-disable no-param-reassign */
import {
  createStore,
  applyMiddleware,
  combineReducers,
  Middleware,
  Dispatch
} from 'redux'
import createRootModel from './createRootModel'
import createMiddleware from './createMiddleware'
import { Options, Model } from './interface'

const defaultOptions = {
  reducers: {},
  loadingModel: false,
  middlewares: [] as Middleware[]
}

export default function <S = any> (
  models: Array<Model<S>>,
  options = defaultOptions as Options<S>
) {
  const rootModel = createRootModel<S>(
    models,
    options.loadingModel
  )
  const modelMiddleware = createMiddleware(rootModel, options.loadingModel)
  const middlewares = [modelMiddleware, ...(options.middlewares || [])]
  let devtoolsFn
  if (process.env.NODE_ENV === 'development') {
    devtoolsFn =
      typeof window === 'object'
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION__
        : null
  }

  return applyMiddleware<Dispatch, typeof rootModel['state']>(...middlewares)(
    devtoolsFn ? devtoolsFn()(createStore) : createStore
  )(
    combineReducers<typeof rootModel['state']>({
      ...rootModel.reducers,
      ...options.reducers
    })
  )
}
