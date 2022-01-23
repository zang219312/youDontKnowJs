//①  当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。
function foo() {
  var a = 2
  function bar() {
    console.log(a) // 2
  }
  bar()
}
foo()

/**
 * 在上面的代码片段中，函数bar() 具有一个涵盖foo() 作用域的闭包（事实上，涵盖了它能访问的所有作用域，比如全局作用域）。
 * 也可以认为bar() 被封闭在了foo() 的作用域中。因为bar() 嵌套在foo() 内部。
 */
var b = 3
function foo2() {
  var b = 2

  function bar2() {
    console.log(b)
  }

  return bar2
}

var baz = foo2()
baz() // 2

// * 函数 bar2() 的词法作用域能够访问 foo2() 的内部作用域.然后将 bar2（）函数本身当作一个值的类型进行传递。
// * 在这个例子中，我们将 bar2 所引用的函数对象本身当作返回值
//  在 foo2() 执行后，其返回值（也就是内部的 bar2() 函数）赋值给变量 baz 并调用baz()，
//  实际上只是通过不同的标识符引用调用了内部的函数 bar2()
// * 但是在这个例子中，它在自己定义的词法作用域以外的地方执行。

/**
 * 在 foo2（）执行后，通常会期待 foo2（） 的整个内部作用域被销毁，
 * 因为我们知道引擎有垃圾回收器用来释放不再使用的内存空间。由于看上去 foo2() 的内容不会再被使用，所以很自然地会考虑对其进行回收。
 */

/**
 * * 事实上内部作用域依然存在，因此没有被回收,谁在使用这个内部作用域？原来是 bar2() 本身在使用。
 */

/**
 * 拜 bar2() 所声明的位置所赐，它拥有涵盖 foo2() 内部作用域的闭包，使得该作用域能够一直存活，以供 bar2() 在之后任何时间进行引用。
 */

// bar2() 依然持有对该作用域的引用，而这个引用就叫作闭包
console.log('--------------')
// eg 3.
function foo3() {
  var c = 2

  function baz3() {
    console.log(c) // 2
  }

  bar3(baz3)
}

function bar3(fn) {
  fn()
}

foo3()

console.log('-----------')

var fn
function foo4() {
  var d = 2
  function baz4() {
    console.log('🚀 ~ file: chapter-5：闭包.js ~ line 74 ~ baz4 ~ d', d)
  }
  fn = baz4 // 将baz4 分配给全局变量
}
function bar4() {
  fn() // 妈妈快看呀，这就是闭包！
}
foo4()
bar4() // 2

// 👀 无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。

// 5.3

function wait(msg) {
  setTimeout(function timer() {
    console.log(msg)
  }, 1000)
}

wait('hello, closure! ')

/**
 * 将一个内部函数（名为timer）传递给setTimeout(..)。timer 具有涵盖wait(..) 作用域的闭包，因此还保有对变量message 的引用
 * wait(..) 执行1000 毫秒后，它的内部作用域并不会消失，timer 函数依然保有wait(..)作用域的闭包。
 */

/**
 * 👀 本质上无论何时何地，如果将函数（访问它们各自的词法作用域）当作第一级的值类型并到处传递，你就会看到闭包在这些函数中的应用。
 * 在定时器、事件监听器、Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，
 * 只要使用了回调函数，实际上就是在使用闭包！
 */

// 5.4 循环和闭包
/* for (var i = 1; i <= 5; i++) {
  setTimeout(function timer2() {
    console.log(i)
  }, i * 1000)
} */

/* for (var i = 1; i <= 5; i++) {
  ;(function (j) {
    setTimeout(function timer2() {
      console.log(j)
    }, j * 1000)
  })(i)
} */
console.log(':)')
/* for (let index = 1; index <= 5; index++) {
  setTimeout(function timer3() {
    console.log(index)
  }, index * 1000)
} */

// for 循环头部的let 声明还会有一个特殊的行为
// 这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。

console.log('----- 模块 ---------')
function CoolModule() {
  var something = 'cool'
  var another = [1, 2, 3]
  function doSomething() {
    console.log(something)
  }
  function doAnother() {
    console.log(another.join(' ! '))
  }
  return {
    doSomething,
    doAnother
  }
}

let fun = CoolModule()
fun.doSomething()
fun.doAnother()

// doSomething() 和doAnother() 函数具有涵盖模块实例内部作用域的闭包（ 通过调用 CoolModule() 实现）。
// 模块模式需要具备两个必要条件
// 1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。
// 2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

// CoolModule() 每次调用都会返回一个新的模块实例
// 当只需要一个新的模块实例时
console.log(' IIFE ')

var fooSin = (function (e) {
  var something = 'cool'
  var another = [1, 2, 3]
  function doSomething() {
    console.log(something)
  }
  function doAnother() {
    console.log(another.join(' # '))
  }
  return {
    doSomething,
    doAnother
  }
})()

fooSin.doSomething()
fooSin.doAnother()

var foo2Sin = (function (str) {
  function change() {
    publicApi.identity = identity2
  }

  function identity1() {
    console.log(str)
  }

  function identity2() {
    console.log(str.toUpperCase())
  }
  var publicApi = {
    change,
    identity: identity1
  }
  return publicApi
})('foo module')

foo2Sin.identity()
foo2Sin.change()
foo2Sin.identity()

// ? 通过在模块实例的内部保留对公共API 对象的内部引用，可以从内部对模块实例进行修改，包括添加或删除方法和属性，以及修改它们的值。

// * 5.5.1 现在的模块的机制
// 大多数模块依赖加载器/ 管理器本质上都是将这种模块定义封装进一个友好的API
console.log('现在的模块的机制')
var MyModules = (function Manager() {
  var modules = {}
  function define(name, deps, impl) {
    // name === bar 时 ,deps = []
    // modules[bar] = { hello : fun }

    // name === foo 时，deps = ['bar']
    // deps[0] = modules[bar] = { hello : fun }

    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]]
    }
    modules[name] = impl.apply(impl, deps) // !
  }

  function get(name) {
    return modules[name]
  }

  return { define, get }
})()

// ? 为了模块的定义引入了包装函数（可以传入任何依赖），并且将返回值，也就是模块的API，储存在一个根据名字来管理的模块列表中。
// define() 将 hello 和 awesome存储在 modules 中

MyModules.define('bar', [], function () {
  function hello(name) {
    return 'Let me introduce: ' + name
  }
  return { hello }
})

MyModules.define('foo', ['bar'], function (e) {
  function awesome() {
    console.log(e.hello('apple').toUpperCase())
  }

  return { awesome }
})

var bar1 = MyModules.get('bar')
console.log('bar1  ', bar1)

var foo1 = MyModules.get('foo')
console.log('foo1 ', foo1)

console.log(bar1.hello('banana'))

foo1.awesome()

console.log('-----  uid   --------')
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

console.log(guid())
