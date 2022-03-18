export default (
  action: string,
  type: string,
  preState: Record<string, any>,
  nextState: Record<string, any> | null,
  payload: any
) => {
  // title: () => '#409EFF',
  //         prevState: () => '#909399',
  //         action: () => '#E6A23C',
  //         nextState: () => '#67C23A',
  //         error: () => '#F56C6C',
  if (process.env.NODE_ENV === 'development') {
    const date = new Date()
    const hour = `  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    console.groupCollapsed(`%c ${action}${type}`, 'color:#409EFF;', hour)
    console.log('%c preState', 'color:#909399;', preState, hour)
    console.log('%c payload', 'color:#E6A23C;', payload, hour)
    console.log('%c nextState', 'color:#67C23A;', nextState, hour)
    console.groupEnd()
  }
}
