export function pipe(...funcs: Array<(...args: any[]) => any>): (...args: any[]) => any[] {
  return (base: string, startingList: any[], options?: Record<string, any>) => {
    return funcs.reduce((acc, cur) => {
      return cur(base, acc, options)
    }, startingList)
  }
}
