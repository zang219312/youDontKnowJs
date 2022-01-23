function foo(a) {
  var b = a
  return a + b
}

var c = foo(2)

//  foo() 调用时 找到foo RHS: 1次
//  a=2   2 给形参赋值  LHS：1次
//  var b = a 时  a RHS 1次 b LHS 1次
//  a+b RHS 2次
//  c = ... LHS 1次
