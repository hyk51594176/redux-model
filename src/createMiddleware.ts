import { RootModel } from './interface';
import { Middleware, Dispatch } from 'redux';
import createDispatch from './createDispatch';

export default <S>(rootModel: RootModel<S>): Middleware<{}, S, Dispatch> => {
  return (middlewareApi) => (next) => (...args) => {
    if (typeof args[0] === 'string') {
      return createDispatch(middlewareApi, rootModel)(...args);
    }
    return next(...args);
  };
};
