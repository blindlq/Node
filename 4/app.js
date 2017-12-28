    //引入依赖
    var eventproxy = require('eventproxy');
    var superagent = require('superagent');
    var cheerio = require('cheerio');


    //url  node.js标志库依赖
    var url = require('url');


    //目标网站
    var cnodeUrl = 'https://cnodejs.org/';

    superagent(cnodeUrl).end(function (err,res) {
        if(err){
            return console.error(err);
        }
        var topicUrls = [];
        // res.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        var $ = cheerio.load(res.text);
        // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
        // 我们用 url.resolve 来自动推断出完整 url，变成
        // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
        // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
        $('#topic_list .topic_title').each(function (index,element) {
            var $element = $(element);
            var href = url.resolve(cnodeUrl,$element.attr('href'));
            topicUrls.push(href);
        });
        //事件端口实例化
        var eq = new eventproxy();

        //注册监听事件
        //api用法https://github.com/JacksonTian/eventproxy#%E9%87%8D%E5%A4%8D%E5%BC%82%E6%AD%A5%E5%8D%8F%E4%BD%9C
        eq.after('topic_html',topicUrls.length,function (topics) {
            //console.log(2);
            topics = topics.map(function (value) {

                var topicUrl = value[0];
                //console.log(topicUrl);
                var topicHtml = value[1];

                var $ = cheerio.load(topicHtml);
                //console.log($('.topic_full_title').text().trim());
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                });
            });
                console.log('final:');
                console.log(topics);


        });

        //触发监听事件
        var i= 0 ;
        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl).end(function (err,res) {
               if(err){
                    //i  = i++;
                    //console.log(i);
                    //return console.error(err);
                }
                //console.log('fetch ' + topicUrl + ' successful');
                //触发
                eq.emit('topic_html',[topicUrl, res.text]);


            });
        });

        //console.log(i);
        



        //console.log(topicUrls);
    });




