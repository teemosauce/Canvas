(function (global, factory) {
    global.Class = factory();
})(this, function () {
    var Class = {
        create: function () {

            // 定义要创建的类
            function Fun() {
                // 构造函数中默认执行initialize函数 类似于自定义的构造函数
                this.initialize.apply(this, arguments)
            }

            // 获取创建该类传递的参数列表并直接转换成数组
            var args = Array.prototype.slice.apply(arguments)

            // 取出第一个参数 如果第一个参数是function 代表有父类需要继承
            if (typeof args[0] === 'function') {
                // 有父类取出来
                var Parent = args.shift();

                // 重新定义一个局部类 指向该父类的原型
                function FunParent() {}
                FunParent.prototype = Parent.prototype

                // 将子类的原型指向父类的实例 这样子类就拥有和父类一样的属性和方法
                Fun.prototype = new FunParent()
            }

            /**
             * 将其他参数全部转成一个对象 因为可能传递多个对象 将最终对象上的方法全部复制到原型上面
             */
            var custom = Object.assign.apply(Object, arguments);
            for (var key in custom) {
                Fun.prototype[key] = custom[key]
            }

            // 重新包装一下initialize 方法 让该方法的只能执行一次
            var initialize = Fun.prototype.initialize || noop
            Fun.prototype.initialize = function () {
                if (!this.$initialized) {
                    initialize.apply(this, arguments);
                    this.$initialized = true;

                    Object.defineProperty(this, '$initialized', {
                        configurable: false,
                        value: true,
                        writable: false
                    })
                    log.m("初次实例化", arguments)
                } else {
                    log.m("实例化函数只能执行一次")
                }
            }
            return Fun
        }
    }
})