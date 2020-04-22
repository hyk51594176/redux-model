import { RootModel } from './interface';
import { Dispatch, MiddlewareAPI } from 'redux';

const createCommit = (
  dispatch: Dispatch,
  namespace: string,
  separator: string,
) => (type: string, payload?: any) => dispatch({ type: `${namespace}${separator}${type}`, payload });
export default <S>(
  { dispatch, getState }: MiddlewareAPI,
  rootModel: RootModel<S>,
) => (type: string, payload?: any) => {
  const keys = type.split(rootModel.separator);
  const [namespace, methodName] = keys;
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
  } else {
    result = dispatch({ type, payload });
  }
  return result instanceof Promise ? result : Promise.resolve(result);
};
