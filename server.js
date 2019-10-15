var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("贾维斯，需要指定端口号~\nnode server.js 6666 像这样就行");
  process.exit(1);
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("灭霸发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  if (path === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`
    <link rel='stylesheet' href='/a.css'>
    <h1>I am Iron man</h1>
    `);
    response.end();
  } else if (path === "/a.css") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write(`body{color: red;}`);
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你输入的路径不存在对应的内容`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听端口 " +
    port +
    " 成功\n贾维斯，现在就使用浏览器打开 http://localhost:" +
    port +
    " 这个链接吧~"
);
