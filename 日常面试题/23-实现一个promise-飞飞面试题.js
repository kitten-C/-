class MyPromise {
  constructor(func) {
    /**
     * 当前的状态
     * Pending 等待
     * Resolve 执行
     * Rejected 拒绝
     *
     *  */
    this.status = 'Pending'
    // 用户的回调函数
    // 队列
    this.queueResolve = []
    this.queneRejected = []
    // 用户的回调函数
    this._func = func
    // 用户输入的内容
    this._val = null
  }

  _myRejected(val) {
    setTimeout(() => {
      // 判断当前的状态是否是等待
      if (this.status !== 'Pending') return
      // 将现在的状态修改成 执行
      this.status = 'Resolve'
      // 保存当前的数据
      this._val = val
      this.queueResolve.map(call => call(val))
    }, 0)
  }

  _myResolve(val) {
    setTimeout(() => {
      // 判断当前的状态是否是等待
      if (this.status !== 'Pending') return

      // 将现在的状态修改成 错误
      this.status = 'Rejected'
      // 保存当前的回调
      this._val = val
      this.queneRejected.map(call => call(val))
    }, 0)
  }

  then(resolve, reject) {
    resolve =
      typeof resolve === 'function' ? resolve : new Function().bind(null)
    reject = typeof reject === 'function' ? reject : new Function().bind(null)

    // let x = this.#func(this.#myRejected, this.#myResolve);

    if (this.status === 'Pending') {
      this.queueResolve.push(resolve)
      this.queneRejected.push(reject)
    } else if (this.status === 'Resolve') this._myResolve(this._func)
    else this._myRejected(this._func)

    return
  }
}

const p1 = new MyPromise(_myResolve => {
  setTimeout(() => {
    console.log('一秒后')
  }, 1000)
})
