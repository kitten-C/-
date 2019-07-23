// function* helloWorldGenerator() {
//   yield 'hello'
//   yield 'world'
//   return 'ending'
// }

// var hw = helloWorldGenerator()
// console.log(hw.next())

// function* gen() {
//   yield 123 + 456
// }
// Generator是惰性求值（Lazy Evaluation）只有当调用next后，指针指向了123+456的时候才会进行运算

function* f() {
  console.log('执行了！')
}

var generator = f()

setTimeout(function() {
  generator.next()
}, 2000)
// Generator函数可以不用yield表达式，这时候会变成一个单纯的暂缓执行函数，当函数被调用的时候并不会执行，只有再调用了next方法的时候才会执行

// 注意点：yield只能再Generator函数内使用，再普通函数内部使用会报错

// var arr = [1, [[2, 3], 4], [5, 6]];

// var flat = function* (a) {
//   a.forEach(function (item) {
//     if (typeof item !== 'number') {
//       yield* flat(item);
//     } else {
//       yield item;
//     }
//   });
// };

// for (var f of flat(arr)){
//   console.log(f);
// }
// 再上述代码中，因为foreach是一个函数，因此内部使用了yield也同样会报错

// var arr = [1, [[2, 3], 4], [5, 6]]

// var flat = function*(a) {
//   var length = a.length
//   for (var i = 0; i < length; i++) {
//     var item = a[i]
//     if (typeof item !== 'number') {
//       yield* flat(item)
//     } else {
//       yield item
//     }
//   }
// }

// for (var f of flat(arr)) {
//   console.log(f)
// }
// 1, 2, 3, 4, 5, 6

// function* demo() {
//   console.log('Hello' + yield); // SyntaxError
//   console.log('Hello' + yield 123); // SyntaxError

//   console.log('Hello' + (yield)); // OK
//   console.log('Hello' + (yield 123)); // OK
// }
// 当yield表达式如果在另一个表达式中，需要使用小括号包裹

// var myIterable = {}
// myIterable[Symbol.iterator] = function*() {
//   yield 1
//   yield 2
//   yield 3
// }
// var myIterable = {}
// var myIterable = function*() {
//   yield 1
//   yield 2
//   yield 3
// }
// let runMyIterable = myIterable()

// console.log([...runMyIterable]) // [1, 2, 3]

// function* gen() {
//   // some code
// }

// var g = gen()

// g[Symbol.iterator]() === g
// // true
// generator函数返回值，是一个遍历器对象，该对象也有Symbol.iterator属性

// function* f() {
//   for (var i = 0; true; i++) {
//     var reset = yield i
//     if (reset) {
//       i = -1
//     }
//   }
// }

// var g = f()

// g.next() // { value: 0, done: false }
// g.next() // { value: 1, done: false }
// g.next(true) // { value: 0, done: false }

// next方法可以传入一个参数，这个参数代表上一步的返回值
// 由于next传入的参数是上一个步骤的返回值，所以第一次的next传入参数是无效的

function* dataConsumer() {
  console.log('Started')
  console.log(`1. ${yield 'asd'}`)
  console.log(`2. ${yield}`)
  return 'result'
}

let genObj = dataConsumer()
console.log(genObj.next())
// Started
console.log(genObj.next('a'))
// 1. a
console.log(genObj.next('b'))
// 2. b
console.log(genObj.next())
