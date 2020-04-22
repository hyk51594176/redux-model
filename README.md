# @hanyk/redux-model

redux模块化

```
npm install @hanyk/redux-model
```

```jsx


// entry
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { model1 } from 'src/modles';
import { RootContainer } from 'src/container';

// 第一种创建方法

import createStore from '@hanyk/redux-model';

const store = createStore([model1],{
  separator: "/", // 分割符号默认‘/’
  reducers: {}, // 需要 通过combineReducers合并等reducer
  middlewares: [] // 中间件
});


// 第二种创建方法

import { createMiddleware, createRootModel } from "@hanyk/redux-model";
import { createStore, combineReducers, applyMiddleware } from "redux";
const rootModel = createRootModel([model1, model2]);
const store = applyMiddleware(createMiddleware(rootModel))(createStore)(
  combineReducers({
    ...rootModel.reducers,
    test3: reducer, // 兼容 reuder function
  })
);


ReactDOM.render(
  <Provider store={store}>
    <RootContainer />
  </Provider>,
  document.getElementById('container')
);


// model
import { api } from 'src/api';
export default {
  namespace: 'model1',
  state: {
    list: [],
    total: 0,
    offset: 0,
    limit: 10
  },
  reducers: {
    updateList(state, data) {
      return { ...state, ...data };
    }
  },
  actions: {
    async getList({ commit,dispatch,getState }, params) {
      const res = await api.getList(params);
      // actions内可通过commit触发当前namespace下都reducers
      // 触发其他actions或者其他namespace下的reducers和actions 通过dispatch  
      // 根据 dispatch的第一个参数是string类型还是object类型来触发 actions 或者 reducers
      commit('updateList', {
        demandList: res.items,
        total: res.total,
        offset: params.offset,
        limit: params.limit,
      });
      return res;
    }
  }
};



// container
import React from 'react';
import { connect } from 'react-redux';
@connect(
  ({ model1 }) => ({ ...model1 }),
)
export default class App extends React.Component {
  componentDidMount() {
    this.getTableList();
  }

  getTableList = async (obj = { limit: 10, offset: 0 }) => {
    const { offset, limit } = obj;
    const params = { offset, limit };
    // dispatch 第一个参数为string类型会触发actions 返回一个promise
    await this.props.dispatch('model1/getList', params)
     // dispatch 第一个参数为object类型会触发reducers
     this.props.dispatch({type: 'model1/updateList', payload: params})
  }


  render() {
    // 渲染组件
  }
}

// api


```
