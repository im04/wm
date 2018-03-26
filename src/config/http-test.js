var jsonp = require('jsonp'),
    axios = require('axios');
module.exports = {
    jsonp: jsonp,
    axios:axios,
    createAxios: function (fn) {
        return function () {
            return axios(arguments).then(function(){fn&&fn()}).catch(function(){fn&&fn()})
        }

    }
};