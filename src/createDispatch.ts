/* eslint-disable no-plusplus */
/*
 * @Author:
 * @Date: 2020-08-13 13:57:32
 * @LastEditors: 韩玉凯
 * @LastEditTime: 2020-09-29 14:51:39
 * @FilePath: /redux-model/src/createDispatch.ts
 */
import { RootModel } from './interface'
import { Dispatch, MiddlewareAPI } from 'redux'
import log from './log'

const createCommit =
  (
    dispatch: Dispatch,
    namespace: string,
    getState: MiddlewareAPI['getState']
  ) => (type: string, payload?: any) => {
    const preState = getState()
    dispatch({ type: `${namespace}/${type}`, payload })
    log('reducers ', `${namespace}/${type}`, payload, preState, getState())
  }
export default <S>(
  { dispatch, getState }: MiddlewareAPI,
  rootModel: RootModel<S>,
  loadingModel?: boolean
) => (type: string, payload?: any) => {
  const [namespace, methodName] = type.split('/')
  const actions = rootModel.actions[namespace]
  let result
  if (actions && actions[methodName]) {
    log('actions ', `${namespace}/${type}`, payload)
    result = actions[methodName](
      {
        commit: createCommit(dispatch, namespace, getState),
        getState,
        dispatch,
        state: getState()[namespace]
      },
      payload
    )
    if (loadingModel && result instanceof Promise) {
      const loading = JSON.parse(JSON.stringify(getState().loading))
      loading.globalLoading++
      loading[namespace][methodName]++
      result.finally(() => {
        const loading1 = JSON.parse(JSON.stringify(getState().loading))
        loading1.globalLoading--
        loading1[namespace][methodName]--
        dispatch({ type: 'loading/updateLoading', payload: loading1 })
      })
      dispatch({ type: 'loading/updateLoading', payload: loading })
    }
  } else {
    const preState = getState()
    result = dispatch({ type, payload })
    log('reducers ', type, payload, preState, getState(),)
  }
  return result instanceof Promise ? result : Promise.resolve(result)
}
