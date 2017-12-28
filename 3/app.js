
    //  引入依赖
    var express = require('express');
    var cheerio = require('cheerio');
    var superagent = require('superagent');

    //实例化experss
    var app = express();


    app.get('/',function (req,res,next) {
        // 用 superagent 去抓取 https://cnodejs.org/ 的内容
        superagent.get('https://cnodejs.org/').end(function (err,sres) {
            if(err){
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .topic_title').each(function (idx,element) {
                var $element = $(element);
                items.push({
                        title: $element.attr('title'),
                        href: $element.attr('href')
                });
            });

            res.send(items);
        });

    });
    //监听3000端口
    app.listen(3000,function (req,res) {
        console.log('app is running at port 3000');
    });


