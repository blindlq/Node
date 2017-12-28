    //引入依赖
    var express = require('express');
    var utility = require('utility');
    //实例化 express
    var app = express();


    app.get('/',function (req,res) {
        // 从 req.query 中取出我们的 q 参数。
        // 如果是 post 传来的 body 数据，则是在 req.body 里面，
        // 不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到。
        var q = req.query;

        var md5Value = utility.md5(q);
        // for(var i in q){
        //     res.send(i);
        //     res.send(q[i]);
        // }
        res.send(md5Value);

        // res.send(q);
    });

    app.listen(3000,function (req,res) {
            console.log('app is running at port 3000');
    });



