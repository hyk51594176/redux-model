import { defineModel } from './../../src/interface';
/*
 * @Author:
 * @Date: 2020-12-23 18:45:25
 * @LastEditors: 韩玉凯
 * @LastEditTime: 2020-12-30 11:54:31
 * @FilePath: /redux-model/test/helps/model1.ts
 */
import { RootStore } from './store';

const Api = {
  getList(data: any[]) {
    return new Promise<any[]>((reslove) => {
      setTimeout(() => {
        reslove(data);
      }, 100);
    });
  },
};
const model = defineModel<RootStore, 'test'>({
  namespace: 'test',
  state: {
    list: [],
    list2: [],
    list3: [],
  },
  reducers: {
    updateList(state, { list }) {
      return { ...state, list };
    },
    updateList2(state, { list2 }) {
      return { ...state, list2 };
    },
    updateList3(state, { list3 }) {
      return { ...state, list3 };
    },
  },
  actions: {
    async setList({ commit }, data: any[]) {
      const list = await Api.getList(data);
      commit('updateList', { list });
      return data;
    },
    async setList2({ commit }, data: any[]) {
      const list2 = await Api.getList(data);
      commit('updateList2', { list2 });
      return data;
    },
    async setList3({ commit }, data: any[]) {
      const list3 = await Api.getList(data);
      commit('updateList3', { list3 });
      return data;
    },
  },
});

export default model;
