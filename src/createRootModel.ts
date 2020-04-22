import { Model, RootModel } from './interface';
import { Reducer, AnyAction } from 'redux';

const getReducer = <S>(
  model: Model<S>,
  separator: string,
): Reducer<S[keyof S], AnyAction> => (state = model.state, action) => {
    if (!model.reducers) return state;
    const { namespace } = model;
    const methodName = action.type.replace(`${namespace}${separator}`, '');
    const fn = model.reducers[methodName];
    if (typeof fn === 'function') return fn(state, action.payload);
    return state;
  };
export default <S>(models: Array<Model<S, Model<S>['namespace']>>, separator = '/') => models.reduce(
  (l, r) => ({
    separator,
    state: {
      ...l.state,
      [r.namespace]: r.state,
    },
    reducers: {
      ...l.reducers,
      [r.namespace]: getReducer(r, separator),
    },
    actions: {
      ...l.actions,
      [r.namespace]: r.actions,
    },
  }),
  {
    separator,
    state: {},
    reducers: {},
  } as RootModel<S>,
);
