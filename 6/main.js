    //待测试函数
    var fibonacci =function (n) {
        if(n === 1){
            return 1;
        }
        if (n === 0){
            return 0;
        }

        if(n < 0){
            throw new Error('n should >= 0');
        }
        if(n > 10){
            throw new Error('n should <= 10');
        }
        if (typeof n !== 'number'){
            throw new Error('n should be a Number');
        }

        return fibonacci(n-1)+fibonacci(n-2);
    };
    // 导出代码块
    exports.fibonacci = fibonacci;
    //判断是否是模块加载
    if (require.main === module){
        var n = Number(process.argv[2]);
        console.log('fibonacci(' + n + ') is', fibonacci(n));
    }

    //case完成，接下写测试驱动main.test.js
