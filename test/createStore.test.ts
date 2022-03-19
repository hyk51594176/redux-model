/*
 * @Author:
 * @Date: 2020-04-29 15:48:14
 * @LastEditors: 韩玉凯
 * @LastEditTime: 2020-12-30 13:07:07
 * @FilePath: /redux-model/test/createStore.test.ts
 */
import createStore from '../src';
import model1 from './helps/model1';
import model2 from './helps/model2';


describe('创建store', () => {
  const store = createStore([model1, model2]);
  it('暴露的公共API', () => {
    const methods = Object.keys(store);
    // expect(methods.length).toBe(4);
    expect(methods).toContain('subscribe');
    expect(methods).toContain('dispatch');
    expect(methods).toContain('getState');
    expect(methods).toContain('replaceReducer');
  });
  it('多个model模块', () => {
    const keys = Object.keys(store.getState());
    expect(keys.length).toBe(2);
    expect(keys).toContain(model1.namespace);
    expect(keys).toContain(model2.namespace);
  });
});

describe('数据更新', () => {
  it('dispatch 同步更新store ', () => {
    const store = createStore([model1]);
    store.dispatch('test/updateList', { list: ['a', 'b'] });
    store.dispatch('test/updateList2', { list2: [3, 4] });
    const { list, list2 } = store.getState().test;
    expect(list).toEqual(['a', 'b']);
    expect(list2).toEqual([3, 4]);
  });

  it('dispatch 异步更新store ', async () => {
    const store = createStore([model1]);
    const p = store.dispatch('test/setList', ['a', 'b']);
    const p2 = store.dispatch('test/setList2', [3, 4]);
    expect(store.getState().test.list).toEqual([]);
    expect(store.getState().test.list2).toEqual([]);
    await p;
    await p2;
    expect(store.getState().test.list).toEqual(['a', 'b']);
    expect(store.getState().test.list2).toEqual([3, 4]);
  });

  it('dispatch 返回Promise ', () => {
    const store = createStore([model1]);
    const p = store.dispatch('test/updateList', ['a', 'b']);
    const p2 = store.dispatch('test/setList2', [3, 4]);
    expect(p).toBeInstanceOf(Promise);
    expect(p2).toBeInstanceOf(Promise);
  });
});
