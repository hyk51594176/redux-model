import { Model } from '../../src/interface';
import { RootStore } from './store';

const Api = {
  getList(data: any[]) {
    return new Promise((reslove) => {
      setTimeout(() => {
        reslove(data);
      }, 100);
    });
  },
};
const model: Model<RootStore, 'test'> = {
  namespace: 'test',
  state: {
    list: [],
    list2: [],
    list3: [],
  },
  reducers: {
    updateList(state, data: any[]) {
      return { ...state, list: data };
    },
    updateList2(state, data) {
      return { ...state, list2: data };
    },
    updateList3(state, data) {
      return { ...state, list3: data };
    },
  },
  actions: {
    async setList({ commit }, data: any[]) {
      const list = await Api.getList(data);
      commit('updateList', list);
      return data;
    },
    async setList2({ commit }, data: any[]) {
      const list = await Api.getList(data);
      commit('updateList2', list);
      return data;
    },
    async setList3({ commit }, data: any[]) {
      const list = await Api.getList(data);
      commit('updateList3', list);
      return data;
    },
  },
};

export default model;
