const root = () => import(/* webpackChunkName: "home" */  'containers/home');
const container = () => import(/* webpackChunkName: "container" */  'containers/container');
export default {
    name: '推荐位管理',
    path: '/advertisingSetting',
    redirect: '/advertisingSetting/bannerSetting',
    component: root,
    children: [
        {
            name: 'banner',
            path: 'bannerSetting',
            component: () => import(/* webpackChunkName: "banner-setting" */  'containers/page/advertising-setting/banner-setting')
        },
        {
            name: '活动图',
            path: 'activityImage',
            component: () => import(/* webpackChunkName: "activity-image" */  'containers/page/advertising-setting/activity-image')
        },
        {
            name: '自定义标签管理',
            path: 'tagSetting',
            component: () => import(/* webpackChunkName: "tag-setting" */  'containers/page/advertising-setting/tag-setting')
        },
        {
            name: '自定义模块管理',
            path: 'modelSetting',
            component: () => import(/* webpackChunkName: "model-setting" */  'containers/page/advertising-setting/model-setting')
        },
        {
            name: '首页四方格',
            path: 'homePageBannerSetting',
            component: () => import(/* webpackChunkName: "home-page-banner-setting" */  'containers/page/advertising-setting/home-page-banner-setting')
        }
    ]
}