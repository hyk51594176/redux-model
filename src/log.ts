const formateDate = (num: number) => {
  return num < 10 ? `0${num}` : num
}

export default (
  action: string,
  type: string,
  payload: any,
  preState?: Record<string, any>,
  nextState?: Record<string, any>
) => {
  if (process.env.NODE_ENV === 'development') {
    const date = new Date()
    const hour = ` @ ${formateDate(date.getHours())}:${formateDate(
      date.getMinutes()
    )}:${formateDate(date.getSeconds())}`
    console.groupCollapsed(`%c ${action}${type}`, 'color:#409EFF;', hour)
    preState && console.log('%c preState', 'color:#909399;', preState)
    console.log('%c payload', 'color:#E6A23C;', payload)
    nextState && console.log('%c nextState', 'color:#67C23A;', nextState)
    console.groupEnd()
  }
}
