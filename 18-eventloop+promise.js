// 技术点
// 1. eventloop中的执行顺序
// 2. 宏任务&微任务的区别

// setTimeout(() => {
//   console.log(1)
// }, 0)
// Promise.resolve().then(() => {
//   console.log(2)
// })
// console.log(3)
// 答：微任务先执行，之后是宏任务

setTimeout(() => {
  console.log(1)
}, 0)
let a = new Promise(resolve => {
  console.log(2)
  resolve()
})
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(4)
  })
console.log(5)
// 答：promise的executor是一个同步操作，promise链式调用then，每次再执行完后内部生成新的promise对象，可以继续链式调用then，再执行中不断的向微任务（microtack）推入新的函数，因此直至microtack的队列全部清空后才会执行下一波macrotack（宏任务）
