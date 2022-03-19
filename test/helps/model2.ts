import { defineModel } from './../../src/interface';
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
const model = defineModel<RootStore, 'test2'>({
  namespace: 'test2',
  state: {
    data: [],
    data2: [],
  },
  reducers: {
    updateList(state, { data }) {
      return { ...state, data };
    },
    updateList2(state, { data2 }) {
      return { ...state, data2 };
    },
  },
  actions: {
    async setList({ commit }, data) {
      const list = await Api.getList(data);
      commit('updateList', { data: list });
      return data;
    },

    async setList2({ commit, dispatch }, data) {
      const list = await Api.getList(data);
      commit('updateList2', { data2: list });
      await dispatch('test/setList3', [9999]);
      return data;
    },
  },
});

export default model;
