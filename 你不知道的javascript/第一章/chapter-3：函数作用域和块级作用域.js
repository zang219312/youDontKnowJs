// 规避冲突
function foo() {
  function bar(a) {
    //  i = 3 // 修改for 循环所属作用域中的i
    var i = 3 // 遮蔽变量 不会往上一级找i
    console.log(a + i)
  }
  for (var i = 0; i < 10; i++) {
    bar(i * 2) // 糟糕，无限循环了！
  }
}
foo()

// 1. 全局命名空间
var MyReallyCoolLibrary = {
  awesome: 'stuff',
  doSomething: function () {
    // ...
  },
  doAnotherThing: function () {
    // ...
  }
}

// 2. 模块管理
// 详情见第五章

// 3.3 函数作用域
var a = 2

;(function (global) {
  var a = 3
  console.log(a)
  console.log(
    '🚀 ~ file: chapter-3：函数作用域和块级作用域.js ~ line 34 ~ global',
    global.a
  )
})(window)

console.log(a)

undefined = true // 给其他代码挖了一个大坑！绝对不要这样做！
;(function IIFE(undefined) {
  var a

  if (a === undefined) {
    console.log('Undefined is safe here!')
  }
})()
//
var b = 2
;(function IIFE(def) {
  def(window)
})(function (global) {
  var b = 3
  console.log(b)
  console.log(
    '🚀 ~ file: chapter-3：函数作用域和块级作用域.js ~ line 54 ~ IIFE ~ global',
    global.b
  )
})

//* 3.4 块级作用域
function process(data) {}

{
  var bigData = { name: 'zdg' }

  process(bigData)
}

var btn = document.getElementById('my_button')
console.log(btn)
btn.addEventListener(
  'click',
  function (e) {
    console.log(e)
  },
  false
)
