import Router from 'vue-router'
import artistConfig from './artist-config.js';
import backgroundConfig from './background-config.js';
import frontDeskConfig from './front-desk-config.js';
import liveSetting from './live-setting.js';
import musicSetting from './music-setting.js';
import userConfig from './user-config.js';
import videoSetting from './video-setting.js';

Vue.use(Router);

const moduleInit = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import(/* webpackChunkName: "Login" */  'containers/login')
        },
        artistConfig,
        backgroundConfig,
        frontDeskConfig,
        liveSetting,
        musicSetting,
        userConfig,
        videoSetting,
        {
            path:'/error',
            name:'error',
            component:() => import(/* webpackChunkName: "error" */  'containers/error'),
        }
    ]
})
moduleInit.beforeEach((to, from, next) => {
  if(to.matched.length){
    next();
  } else{
    return next({path: '/error'});
  }
});
export default moduleInit