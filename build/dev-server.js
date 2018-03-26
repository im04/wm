var http = require('http'),
        express = require('express'),
        app = express(),
        webpack = require('webpack'),
        webpackConfig = require('./webpack-dev.js'),
        compiler = webpack(webpackConfig),
        utils = require('./utils.js'),
        apiFunc = require('../restful/api.js');
//app.use(require('morgan')('short'));
var os=require('os'),
    iptable=[],
    ifaces=os.networkInterfaces();
for (var dev in ifaces) {
    ifaces[dev].forEach(function(details,alias){
        if (details.family=='IPv4') {
            iptable.push(details.address);
        }
    });
}
var localhost = iptable.filter(function(v,i){
    return /192.168./.test(v);
})[0];
var router = express.Router();
(function() {

    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));
})();

// Do anything you like with the rest of your express application.
app.get("/", function(req, res) {
    res.sendFile(utils.assetsRootPath('./dist/index.html'));
});
app.get("/api/**", function(req, res, next) {
    setTimeout(function(){
        res.json(apiFunc(req.path.slice(5)));
    }, 1000)
})

app.post("/api/**", function(req, res) {
    setTimeout(function(){
        res.json(apiFunc(req.path.slice(5)));
    }, 500)
})

if (require.main === module) {
    var server = http.createServer(app);
    server.listen(10001, localhost, function() {
        console.log("Listening on %j", server.address());
    });
}