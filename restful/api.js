const dataObj = {
    userConfig: require('./user-config.js'),
    advertisingSetting: require('./advertising-setting.js'),
    artistConfig: require('./artist-config.js'),
    backgroundConfig: require('./background-config.js'),
    frontDeskConfig: require('./front-desk-config.js'),
    liveSetting: require('./live-setting.js'),
    musicSetting: require('./music-setting.js'),
    videoSetting: require('./video-setting.js'),
}
module.exports = function (path) {
    return getProp(dataObj,path.split('/'));
}
function getProp(obj,keys) {
    // return keys.length > 1?getProp(obj[keys.shift()],keys):obj[keys[0]];
    return keys.reduce((accumulator,value)=>{
        return accumulator[value];
    },obj)
}