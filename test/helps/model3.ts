import { Test3 } from './store';
import { Reducer } from 'redux';

const intitState = {
  dataList: 123,
  dataList2: 123,
};

const reduer:Reducer<Test3> = function (
  state = intitState,
  action = { type: 'init', data: '' },
) {
  switch (action.type) {
    case 'changedataList':
      return { ...state, dataList: action.data };
    case 'changedataList2':
      return { ...state, dataList2: action.data };
    default:
      return state;
  }
};
export default reduer;
