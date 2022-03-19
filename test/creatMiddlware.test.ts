/*
 * @Author:
 * @Date: 2020-12-23 18:45:25
 * @LastEditors: 韩玉凯
 * @LastEditTime: 2020-12-30 13:05:03
 * @FilePath: /redux-model/test/creatMiddlware.test.ts
 */
import { createMiddleware, createRootModel } from '../src';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import model1 from './helps/model1';
import model2 from './helps/model2';
import model3 from './helps/model3';
import { RootStore } from './helps/store';

function getStore() {
  const rootModel = createRootModel([model1, model2]);
  const store = applyMiddleware(createMiddleware(rootModel))(createStore)(
    combineReducers<RootStore>({
      ...rootModel.reducers,
      test3: model3,
    }),
  );
  return store;
}
describe('middleware', () => {
  it('暴露的公共API', () => {
    const methods = Object.keys(getStore());
    // expect(methods.length).toBe(4);
    expect(methods).toContain('subscribe');
    expect(methods).toContain('dispatch');
    expect(methods).toContain('getState');
    expect(methods).toContain('replaceReducer');
  });
  it('dispatch 同步更新store', () => {
    const store = getStore();
    store.dispatch({ type: 'test/updateList', payload: { list: ['a', 'b'] } });
    store.dispatch({ type: 'test/updateList2', payload: { list2: [3, 4] } });
    const { list, list2 } = store.getState().test;
    expect(list).toEqual(['a', 'b']);
    expect(list2).toEqual([3, 4]);
    store.dispatch({ type: 'changedataList', data: 11111 });
    store.dispatch({ type: 'changedataList2', data: 22222 });
    const { dataList, dataList2 } = store.getState().test3;
    expect(dataList).toEqual(11111);
    expect(dataList2).toEqual(22222);
  });

  it('dispatch 异步更新store ', async () => {
    const store = getStore();
    const p = store.dispatch('test/setList', ['a', 'b']);
    const p2 = store.dispatch('test2/setList2', [3, 4]);
    expect(store.getState().test.list).toEqual([]);
    expect(store.getState().test.list2).toEqual([]);
    await p;
    await p2;
    expect(store.getState().test.list).toEqual(['a', 'b']);
    expect(store.getState().test2.data2).toEqual([3, 4]);
    expect(store.getState().test.list3).toEqual([9999]);
  });

  it('dispatch 第一个参数为string（type, playod） 返回Promise ', () => {
    const store = getStore();
    const p = store.dispatch('test/updateList', ['a', 'b']);
    const p2 = store.dispatch('test/setList2', [3, 4]);
    expect(p).toBeInstanceOf(Promise);
    expect(p2).toBeInstanceOf(Promise);
  });
});
