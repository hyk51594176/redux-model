export interface RootStore {
  test: Test;
  test2: Test2;
  test3: Test3
}

export interface Test {
  list: any[];
  list2: any[];
  list3: any[];
}

export interface Test2 {
  data: any[];
  data2: any[];
}
export interface Test3 {
  dataList: number;
  dataList2: number;
}
