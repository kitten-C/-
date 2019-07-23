Function.prototype.myCall = myCall
function myCall(_this) {
  console.log(this)
  _this._this = this
  let temp = []
  for (var i = 1; i < arguments.length; i++) {
    temp.push(arguments[i])
  }
  const result = _this._this(temp.join())
}
Math.max.myCall(2, 3, 4)
console.log(Math.max(1, 2))

// Function.prototype.myCall = function(_this = window, val) {
//   _this.this = this
//   const result = _this._this(...val)
//   return result
// }
// let obj = {
//   0: 'a',
//   1: 'b',
//   2: 'c',
//   length: 3
// }

// console.log([].join.myCall(obj))
