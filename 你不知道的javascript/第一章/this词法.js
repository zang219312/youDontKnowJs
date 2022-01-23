var obj = {
  id: 'awesome',
  cool: function coolFn() {
    console.log(this.id)
  }
}

var id = 'not 123'
obj.cool() // awesome 指向obj
setTimeout(obj.cool, 100) // not 123 指向 window

var obj2 = {
  count: 0,
  cool: function coolFn() {
    var self = this
    if (self.count < 1) {
      setTimeout(function timer() {
        self.count++
        console.log('cool ?')
      }, 100)
    }
  }
}

obj2.cool()

// 改前
var obj3 = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(() => {
        // 箭头函数是什么鬼东西？
        this.count++
        console.log('1234 ?')
      }, 100)
    }
  }
}

obj3.cool()

// 改后
var obj4 = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(
        function timer() {
          console.log(this)
          // 箭头函数是什么鬼东西？
          this.count++
          console.log('1234 ?')
        }.bind(this),
        100
      )
    }
  }
}

obj4.cool()
