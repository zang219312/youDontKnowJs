/* console.log(a) // undefined

var a = 2
console.log(a) // 2 */

// 包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理。
// 实际上是 var a;a=2。
// 定义声明是在编译阶段进行的。复制声明会留在原地等待执行
// 上面的代码hi按照一下流程处理
var a
console.log(a)
a = 2

/*
只有声明本身会被提升，而赋值或其他运行逻辑会留在原地。如果提升改变
了代码执行的顺序，会造成非常严重的破坏。 */

foo()

function foo() {
  console.log(b)
  var b = 2
}

// 实际处理
function foo2() {
  var b
  console.log(b) // undefined
  b = 2
}

foo2()

// *函数声明会被提升，但是函数表达式却不会被提升。
console.log('🚀 ~ file: chapter-4：提升.js ~ line 35 ~ foo3', foo3)
// foo3() // TypeError,  不是ReferenceError
var foo3 = function vvv() {
  console.log(1)
}

//* 即使是具名的函数表达式，名称标识符在赋值之前也无法在所在作用域中使用：

/* foo4() // typeError
bar() // ReferenceError

var foo4 = function bar() {
  console.log(2)
} */

// 这个代码片段经过提升后，实际上会被理解为以下形式：
var foo4

// foo4() // TypeError: foo4 is not a function
// bar() // ReferenceError: bar is not defined

foo4 = function () {
  // var bar = ...self...
}

/**
 * 4.3 函数优先
 */
// *是函数会首先被提升，然后才是变量。

/* foo5() // 1
var foo5
function foo5() {
  console.log(1)
}

foo5 = function () {
  console.log(2)
} */

// 这个代码片段会被引擎理解为如下形式：
function foo5() {
  console.log(1)
}
foo5() //1
// var foo5 // 重复声明，被忽略

foo5 = function () {
  console.log(2)
}
foo5() // 2
// var foo 尽管出现在function foo()... 的声明之前，但它是重复的声明（因此被忽
//* 略了），因为函数声明会被提升到普通变量之前。

// 尽管重复的var 声明会被忽略掉，但出现在后面的函数声明还是可以覆盖前面的。

foo6() // 3
function foo6() {
  console.log('🚀 ~ file: chapter-4：提升.js ~ line 93 ~ foo6 ~ foo6', 1)
}
var foo6 = function () {
  console.log(2)
}
function foo6() {
  console.log('🚀 ~ file: chapter-4：提升.js ~ line 99 ~ foo6 ~ foo6', 3)
}

// 一个普通块内部的函数声明通常会被提升到所在作用域的顶部，这个过程不会像下面的代
// 码暗示的那样可以被条件判断所控制：
console.log('🚀 ~ file: chapter-4：提升.js ~ line 109 ~ foo7', foo7)
foo7() //实际：typeError 书上是"b"
var a = true
if (a) {
  function foo7() {
    console.log('a')
  }
} else {
  function foo7() {
    console.log('b')
  }
}

/**
 * 4.4　小结
 */
// 我们习惯将var a = 2; 看作一个声明，而实际上JavaScript 引擎并不这么认为。它将var a
// 和a = 2 当作两个单独的声明，第一个是编译阶段的任务，而第二个则是执行阶段的任务。
// 这意味着无论作用域中的声明出现在什么地方，都将在代码本身被执行前首先进行处理。
// 可以将这个过程形象地想象成所有的声明（变量和函数）都会被“移动”到各自作用域的
// 最顶端，这个过程被称为提升。
// * 声明本身会被提升，而包括函数表达式的赋值在内的赋值操作并不会提升。
