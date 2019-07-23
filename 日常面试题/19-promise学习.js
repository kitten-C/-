// const p1 = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     resolve()
//   }, 1000)
// })

// const p2 = new Promise(function(resolve, reject) {
//   resolve(p1)
// })
// p2.then(() => {
//   console.log('p1完成了我也就开始了')
// })
// console.log(p1, p2)
// 可以通过传递里另外一个promise实例，状态由传递进来的决定

// const p1 = new Promise(function(resolve, reject) {
//   setTimeout(() => reject(new Error('fail')), 3000)
// })

// const p2 = new Promise(function(resolve, reject) {
//   setTimeout(() => resolve(p1), 1000)
// })

// p2.then(result => console.log(result)).catch(error => console.log(error))
// Error: fail
// 因为p2的resolve里面传递进了p1,所以,当p2状态发生改变的时候,p1还没有改变状态,所以此时的状态无效,等2s后p1传递过来reject状态,p2状态随之改变成了reject,最终触发catch方法中的回调函数

// new Promise((resolve, reject) => {
//   resolve(1)
//   console.log(2)
// }).then(r => {
//   console.log(r)
// })

// resolve,和reject状态的改变,会在事件的末尾执行,所以即使resolve在事件的中间或者上面的时候,也会最后执行,但是当resolve执行的时候意味着promise的使命已经完成了,最好写在事件的最后,或者加上return如下代码所示
// new Promise((resolve, reject) => {
//   return resolve(1)
//   // 后面的语句不会执行
//   console.log(2)
// })

// then是Promise的方法,随后then是Promisel.prototype上的方法,在then执行完后,会返回一个Promise实例,所以可以链式继续调用then方法,但是要注意的是,返回的是个新的Promise实例,而不是原来的,并且这个Promise实例默认为resolve状态
// 链式的then接受的参数,是上一个then的返回值
// const p1 = new Promise((resolve, reject) => {
//   resolve('p1完成了')
// })
// p1.then(res => {
//   console.log(res)
//   return '完成后的返回值'
// }).then(
//   res => {
//     console.log(res)
//   },
//   res => {
//     console.log(res)
//   }
// )

// catch有三种写法
// const p1 = new Promise((resolve, reject) => {
//   reject()
// })
// 1. 作为then的第二个参数
// p1.then(success => console.log('成功了'), error => console.log('失败了'))
// 2. 链式then,第一个参数填null或者undefined,第二个参数为回调函数
// p1.then(success => console.log('成功了')).then(null, error =>
//   console.log('失败了')
// )
// 3. catch
// p1.catch(error => console.log('失败了'))

// const promise = new Promise(function(resolve, reject) {
//   resolve('ok')
//   throw new Error('test')
// })
// promise
//   .then(function(value) {
//     console.log(value)
//   })
//   .catch(function(error) {
//     console.log(error)
//   })
// reject 的作用也相当于 抛出一个错误 所以再上述代码中，已经是resolve状态了，后面抛出错误的代码就不会执行 了

// new Promise(() => {})
//   .then(function(post) {
//     return new Promise(() => {})
//   })
//   .then(function(comments) {
//     // some code
//   })
//   .catch(function(error) {
//     // 处理前面三个Promise产生的错误
//   })
// promise 对象抛出错误，具有“冒泡”的性质，以上代码，不论是第一个promise对象抛出错误，还是第二个，最终都会被最终的catch捕获

// 一般用.catch来捕获错误，而不是用then的第二个回调函数 续下解释
// bad
// promise
//   .then(function(data) {
//     // success
//   }, function(err) {
//     // error
//   });

// // good
// promise
//   .then(function(data) { //cb
//     // success
//   })
//   .catch(function(err) {
//     // error
//   });
// 因为用.catch不仅可以获取promise对象的错误,还可以捕获.then的错误,在书写中也更加接近try catch  区别是promise对象抛出错误如果没有用catch铺货,不会做任何处理

// 在node中，unhandleRejection事件可以监听未捕获的reject错误
// process.on('unhandleRejection', function(err, p) {
//   throw err
// })

// Promise.resolve()
//   .catch(function(error) {
//     console.log('oh no', error)
//   })
//   .then(function() {
//     console.log('carry on')
//   })
// 上述代码中 catch写在了前面，这时候只会捕获catch之前的错误，后面的then中出的错误不会捕获

// 假如catch中也要处理程序，这时候报错，就不能捕获，所以可以在后面再链式一个catch
// someAsyncThing().then(function() {
//   return someOtherAsyncThing();
// }).catch(function(error) {
//   console.log('oh no', error);
//   // 下面一行会报错，因为y没有声明
//   y + 2;
// }).catch(function(error) {
//   console.log('carry on', error);
// });
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]

// Promise.prototype.finally
// finally方法：不管前面的promise是什么状态都会执行 怕
// promise
// .then(result => {···})
// .catch(error => {···})
// .finally(() => {···});

// finally的回调函数不接受任何参数,所以,我们不能知道前面的promise对象的具体状态,

// finally的本质是then方法的特例

// 这里不理解
// 为什么要捕获this.constructor 的状态，而不是this的
// Promise.prototype.finally = function(callback) {
//   let P = this.constructor
//   console.log(P)
//   return this.then(
//     value => P.resolve(callback()).then(() => value),
//     reason =>
//       P.resolve(callback()).then(() => {
//         throw reason
//       })
//   )
// }

// const p1 = new Promise(() => {
//   setTimeout(() => {
//     console.log(1)
//   }, 1000)
// })
// p1.finally(() => {})

// Promise.all()
// 此方法把多个promise对象封装成一个promise对象
// 如果传入的参数不是promise实例，就会先调用Promise.resolve方法，把参数转化为Promise实例，再进行下一步（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）（这句话不是很理解，什么是Iterator接口）

//  const p = Promise.all([p1, p2, p3]);
// 看上述代码
// P的状态由后面的Promise实例决定
// 1. 当后面三个Promise实例的状态都变为了fulfilled（完成的），P的状态会变成fulfilled，此时的p1,p2,p3的返回值组成一个数组，传递给P的回调函数
// 2. 只要p1,p2,p3之中有一个被rejected,p的状态就会变成rejected,此时第一个被rejected的实例的返回值，会被传给p的回调函数

// 如果传进去的Promise实例，自己定义了catch方法，那么这个对象状态变成rejected，并不会出发Promise.all()的catch方法
// const p1 = new Promise((resolve, reject) => {
//   resolve('hello')
// })
//   .then(result => result)
//   .catch(e => e)

// const p2 = new Promise((resolve, reject) => {
//   throw new Error('报错了')
// })
//   .then(result => result)
//   .catch(e => e)

// Promise.all([p1, p2])
//   .then(result => console.log(result))
//   .catch(e => console.log(e))
// ["hello", Error: 报错了]

// 首先P1状态会变成resolve，p2状态变成rejected，这时候出发p2的catch方法，并且返回一个新的Promise实例，该实例完成后返回resolve装填，实际Promise.all()，接收的是这个对象，所以最终出发的是then方法
// 如果P2没有自己的catch方法，就会出发Promise.all()的catch方法

// Promise.race()
// 此方法传入参数的方式和Promise.all()相同，当传进去的Promise实例的任意一个先改变了状态，此实例也会跟着改变，首先改变状态的Promise实例的返回值，就会传递给此Promise实例的回调函数

// const p = Promise.race([
//   fetch('/resource-that-may-take-a-while'),
//   new Promise(function(resolve, reject) {
//     setTimeout(() => reject(new Error('request timeout')), 5000)
//   })
// ])

// p.then(console.log).catch(console.error)
// 上述代码意思是当第一个promise实例再5s内没有反应，那个第二个promise实例状态就会变成rejected，p的状态也会随之变成rejected，然后触发catch方法

// Promise.resolve()
// 此方法可以把现有的一个对象转化成会Promise对象
// const jsPromise = Promise.resolve($.ajax('/whatever.json'))

// 此方法的另外中写法
// Promise.resolve('foo')
// // 等价于
// new Promise(resolve => resolve('foo'))

// Promise.resolve方法的参数分成四种情况。
// 1. 参数是一个 Promise 实例
//    不做任何处理

// 2. 参数是一个thenable对象（thenable对象指的就是带有then方法的对象）
// let thenable = {
//   then: function(resolve, reject) {
//     resolve(42)
//   }
// }
// promise.resolve方法会把这个对象转化为Promise对象，然后立即执行，对象中的then方法，当then方法执行完成后，该对象的状态会变为resolve状态

// 4. 不带有任何参数
// 直接返回一个resolve状态的Promise对象，所以希望得到一个Promise对象，比较方便的方法是直接调用Promise.resolve()方法
// 返回的对象,是再本轮的事件循环(event loop)的结束时执行,而不是再下一轮的事件循环的开始时

// setTimeout(function() {
//   console.log('three')
// }, 0)

// Promise.resolve().then(function() {
//   console.log('two')
// })

// console.log('one')

// one
// two
// three

// Promise.reject()
// 作用同上,返回的实例状态为rejected
// const p = Promise.reject('出错了')
// // 等同于
// const p = new Promise((resolve, reject) => reject('出错了'))

// p.then(null, function(s) {
//   console.log(s)
// })

// const thenable = {
//   then(resolve, reject) {
//     reject('出错了');
//   }
// };

// Promise.reject(thenable)
// .catch(e => {
//   console.log(e === thenable)
// })
// true
// 返回值不是then中的出错了,而是传进去的对象本身

// Promise.try
// 当一个函数运行时,不一定是同步或者是异步函数的时候,可以用此方法
