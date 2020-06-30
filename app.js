#!/usr/bin/node

const http = require('http'),
    url = require('url'),
    qs = require('querystring')

http.createServer((req, res) => {
    console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`)
    console.log(req.headers)

    var addr = url.parse(req.url)
    
    if (addr.pathname !== '/rectangle' || req.method !== 'GET') {
        res.end('GET /rectangle?width=2&height=3 HTTP/1.1')
        return
    }

    var rect = qs.parse(addr.query)
    var r = {
        'area': Number(rect.width) * Number(rect.height),
        'perimeter': 2 * (Number(rect.width) + Number(rect.height))
    }
    res.end(JSON.stringify(r))
}).listen(8080)

process.on('stop', function() {
    console.log('服务被停止运行！')
    process.exit();
})