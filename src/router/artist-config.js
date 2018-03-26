const root = () => import(/* webpackChunkName: "home" */  'containers/home');
const container = () => import(/* webpackChunkName: "container" */  'containers/container');
export default {
    name: '艺人管理',
    path: '/artistConfig',
    component: root,
    redirect: '/artistConfig/artistSetting',
    children: [
        {
            name: '艺人管理 ',
            path: 'artistSetting',
            component: container,
            props:{
                level: 2,
                name: 'artist-setting',
                component: () => import(/* webpackChunkName: "artist-setting" */  'containers/page/artist-config/artist-setting')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: '添加艺人',
                    path: 'artistSettingEdit',
                    component: () => import(/* webpackChunkName: "artist-setting-edit" */  'containers/page/artist-config/artist-setting-edit'),
                }
            ]
        }
    ]
}