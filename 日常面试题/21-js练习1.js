// var a = 10
// function foo() {
//   console.log(a) // ??
//   var a = 20
// }
// foo()
// // undefined

// var a = 10
// function foo() {
//   console.log(a) // ??
//   let a = 20
// }
// foo()
// // 10

// var array = []
// for (var i = 0; i < 3; i++) {
//   array.push(() => i)
// }
// var newArray = array.map(el => el())
// console.log(newArray) // ??

function foo() {
  setTimeout(foo, 0) // 是否存在堆栈溢出错误?
}
