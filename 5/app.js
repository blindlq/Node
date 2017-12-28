    //引入async依赖
    // var async = require('async');
    //
    ////定义计数器
    // var concurrencyCount = 0;
    //
    ////模拟抓取函数
    // var fetchUrl = function (url,callback) {
            ////定义一个随机数
        // var delay = parseInt((Math.random()*1000000) % 2000,10);
        ////计数器自增长
        // concurrencyCount++;
        // console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
        ////抓取完毕计数器自减
        // setTimeout(function () {
        //     concurrencyCount--;
        //     callback(null,url+'html content');
        // },delay);
    //
    //
    // };
    ////模拟抓取的url
    // var urls = [];
    // for(var i =0;i<40;i++){
    //     urls.push('http://datasource_' + i);
    // }
    //
   // //控制并发读取url
    // async.mapLimit(urls,5,function (url,callback) {
      ////  调用抓取函数
        // fetchUrl(url, callback);
        // },function (err,result) {
        // console.log('final:');
        // console.log(result);
    //
    //});

    //----- 在4中我们发现有些url，是抓取不到因为一次性异步并发40条，目标服务器会默认为异常操作，返回503，因此我们需要控制异步并发 ---//
    //-----因此我们重新修改一下4的代码，使其并发控制 ------//
    var superagent = require('superagent');
    var cheerio = require('cheerio');

    var url = require('url');

    //目标网站
    var cnodeUrl = 'https://cnodejs.org/';
    
    superagent.get(cnodeUrl).end(function (err,res) {
        if(err){
            return console.error(err);
        }

        var topicUrls = [];
        var $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function (index,element) {
            var $element = $(element);
            var href = url.resolve(cnodeUrl,$element.attr('href'));
            topicUrls.push(href);
        });
        var async = require('async');
        //console.log(topicUrls.length);
        var concurrencyCount = 0;
        var fetchUrl = function (url,callback) {
            //return console.log(url);
            concurrencyCount++;
            var delay = parseInt((Math.random()*1000000) % 2000,10);
            console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
            var content = [];
                superagent.get(url).end(function (err,res) {
                if(err){
                    return console.error(err);
                }
                var $ = cheerio.load(res.text);
                content.push({
                    title: $('.topic_full_title').text().trim(),
                    href: url,
                    comment1: $('.reply_content').eq(0).text().trim(),
                });
            });

            setTimeout(function () {
                    concurrencyCount--;
                    callback(null,content);
                },delay);

        };
        async.mapLimit(topicUrls,5,function (url,callback) {
            //  调用抓取函数
            fetchUrl(url, callback);
            },function (err,result) {
            console.log('final:');
            console.log(result);

            });



    });