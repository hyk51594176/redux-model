/*
 * @Author:
 * @Date: 2020-08-13 13:57:32
 * @LastEditors: 韩玉凯
 * @LastEditTime: 2020-08-14 15:54:42
 * @FilePath: /redux-model/src/createMiddleware.ts
 */
/* eslint-disable @typescript-eslint/ban-types */
import { RootModel } from './interface'
import { Middleware, Dispatch } from 'redux'
import createDispatch from './createDispatch'

export default <S>(
  rootModel: RootModel<S>,
  loadingModel?: boolean
): Middleware<{}, S, Dispatch> => {
  return middlewareApi => next => (...args) => {
    if (typeof args[0] === 'string') {
      return createDispatch(middlewareApi, rootModel, loadingModel)(...args)
    }
    return next(...args)
  }
}
