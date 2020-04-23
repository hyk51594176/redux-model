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
const model: Model<RootStore, 'test2'> = {
  namespace: 'test2',
  state: {
    data: [],
    data2: [],
  },
  reducers: {
    updateList(state, data: any[]) {
      return { ...state, data };
    },
    updateList2(state, data) {
      return { ...state, data2: data };
    },
  },
  actions: {
    async setList({ commit }, data: any[]) {
      const list = await Api.getList(data);
      commit('updateList', list);
      return data;
    },

    async setList2({ commit, dispatch }, data: any[]) {
      const list = await Api.getList(data);
      commit('updateList2', list);
      await dispatch('test/setList3', [9999]);
      return data;
    },
  },
};

export default model;
