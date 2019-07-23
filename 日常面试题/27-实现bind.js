Function.prototype.myBind = function(_this, ...val) {
  _this._this = this
  return function() {
    const result = _this._this(...val)
    delete _this._this
    return result
  }
}

const zx = {
  name: 'zx',
  sayHallow() {
    console.log(this.name)
  }
}

const ls = {
  name: 'ls'
}

zx.sayHallow()
const useBind = zx.sayHallow.myBind(ls)
useBind()
