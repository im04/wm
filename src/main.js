import Vuex from 'vuex';
import App from './App';
import router from './router';
import Store from './store';
import mixin from './mixin';
import ElementUI from 'element-ui';
import './assets/styles/reset.styl';
import 'element-ui/lib/theme-default/index.css';
import './assets/styles/index.styl';
import './assets/script/ks3jssdk.min.js';
import './assets/script/async.min.js';
// import 'cropperjs/src/css/cropper.css';
// import Cropper from 'cropperjs/src/js/cropper.js';

// window.Cropper = Cropper;

window.ks3 = (function() {
    const fn = new Function();
    fn.prototype = Ks3;
    fn.constructor = fn;
    delete window.Ks3;
    return fn;
}())

Vue.use(Vuex);
Vue.use(ElementUI);
const store = new Vuex.Store(Store);
Vue.mixin(mixin);
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
