/* eslint-disable no-plusplus */
/*
 * @Author:
 * @Date: 2020-08-13 13:57:32
 * @LastEditors: 韩玉凯
 * @LastEditTime: 2020-09-29 14:51:39
 * @FilePath: /redux-model/src/createDispatch.ts
 */
import { RootModel } from './interface';
import { Dispatch, MiddlewareAPI } from 'redux';

const createCommit = (dispatch: Dispatch, namespace: string, separator: string) => (
  type: string,
  payload?: any,
) => dispatch({ type: `${namespace}${separator}${type}`, payload });
export default <S>(
  { dispatch, getState }: MiddlewareAPI,
  rootModel: RootModel<S>,
  loadingModel?: boolean,
) => (type: string, payload?: any) => {
  const [namespace, methodName] = type.split(rootModel.separator);
  const actions = rootModel.actions[namespace];
  let result;
  if (actions && actions[methodName]) {
    result = actions[methodName](
      {
        commit: createCommit(dispatch, namespace, rootModel.separator),
        getState,
        dispatch,
      },
      payload,
    );
    if (loadingModel && result instanceof Promise) {
      const loading = JSON.parse(JSON.stringify(getState().loading));
      loading.globalLoading++;
      loading[namespace][methodName]++;
      dispatch({ type: 'loading/updateLoading', payload: loading });
      result.finally(() => {
        const loading1 = JSON.parse(JSON.stringify(getState().loading));
        loading1.globalLoading--;
        loading1[namespace][methodName]--;
        dispatch({ type: 'loading/updateLoading', payload: loading1 });
      });
    }
  } else {
    result = dispatch({ type, payload });
  }
  return result instanceof Promise ? result : Promise.resolve(result);
};
