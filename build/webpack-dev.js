var OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    webpackConfig = require('./webpack-config.js'),
    merge = require('webpack-merge'),
    webpack = require('webpack');
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
var url = 'http://' + iptable.filter(function(v,i){
    return /192.168./.test(v);
})[0] + ':10001';


module.exports = merge(webpackConfig, {
    devtool: 'source-map',
    entry: {
        index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: url }),
    ]
});