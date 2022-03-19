/* eslint-disable no-param-reassign */
/*
 * @Author:
 * @Date: 2020-08-13 13:57:32
 * @LastEditors: 韩玉凯
 * @LastEditTime: 2020-09-29 14:59:17
 * @FilePath: /redux-model/src/createRootModel.ts
 */
import { Model, RootModel } from './interface'
import { Reducer } from 'redux'

const getReducer =
  <S>(model: Model<S>): Reducer<S[keyof S]> => (state = model.state, { type, payload }) => {
    if (!model.reducers) {
      return state
    }
    const { namespace } = model
    if (namespace === 'loading') {
      throw new Error('namespace ===> loading 为保留字段请勿使用')
    }
    const methodName = type.replace(`${namespace}/`, '')
    const fn = model.reducers[methodName]
    if (typeof fn === 'function') return fn(state, payload)
    return state
  }

export default <S>(models: Array<Model<S>>, loadingModel?: boolean) => {
  const rootModel = models.reduce(
    (l, r) => ({
      state: {
        ...l.state,
        [r.namespace]: r.state
      },
      reducers: {
        ...l.reducers,
        [r.namespace]: getReducer<S>(r)
      },
      actions: {
        ...l.actions,
        [r.namespace]: r.actions
      }
    }),
    {
      state: {},
      reducers: {}
    } as RootModel<S>
  )
  if (loadingModel) {
    (rootModel.state as any).loading = Object.entries(
      rootModel.actions || {}
    ).reduce(
      (obj, [namespace, value]) => ({
        ...obj,
        [namespace]: Object.keys(value as any).reduce(
          (l, r) => ({ ...l, [r]: 0 }),
          {}
        )
      }),
      { globalLoading: 0 }
    );
    (rootModel.reducers as any).loading = function (
      state = (rootModel.state as any).loading,
      { type, payload }: any
    ) {
      if (type === 'loading/updateLoading') {
        return { ...state, ...payload }
      }
      return state
    }
  }
  return rootModel
}
