const root = () => import(/* webpackChunkName: "home" */  'containers/home');
const container = () => import(/* webpackChunkName: "container" */  'containers/container');
export default {
    name: '视频管理',
    path: '/videoSetting',
    redirect: '/videoSetting/programSetting',
    component: root,
    children: [
        {
            name: '节目管理',
            path: 'programSetting',
            component: container,
            props:{
                level: 2,
                name: 'program-setting',
                component: () => import(/* webpackChunkName: "program-setting" */  'containers/page/video-setting/program-setting')
            },
            children:[
                {
                    name: '添加节目',
                    path: 'programSettingAdd',
                    component: () => import(/* webpackChunkName: "program-setting-edit" */  'containers/page/video-setting/program-setting-edit'),
                    meta: {
                        isDisabled: false
                    }
                },
                {
                    name: '查看节目',
                    path: 'programSettingCheck/:id',
                    component: () => import(/* webpackChunkName: "program-setting-edit" */  'containers/page/video-setting/program-setting-edit'),
                    meta: {
                        isDisabled: true
                    }
                },
                {
                    name: '编辑节目',
                    path: 'programSettingEdit/:id',
                    component: () => import(/* webpackChunkName: "program-setting-edit" */  'containers/page/video-setting/program-setting-edit'),
                    meta: {
                        isDisabled: false
                    }
                }
            ]
        },
        {
            name: '视频管理 ',
            path: 'uploadVideo',
            component: container,
            props:{
                level: 2,
                name: 'upload-video',
                component: () => import(/* webpackChunkName: "upload-video" */  'containers/page/video-setting/upload-video')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: '添加视频',
                    path: 'uploadVideoAdd',
                    component: () => import(/* webpackChunkName: "upload-video-edit" */  'containers/page/video-setting/upload-video-edit'),
                    meta: {
                        isDisabled: false
                    }
                },
                {
                    name: '查看视频',
                    path: 'uploadVideoCheck/:id',
                    component: () => import(/* webpackChunkName: "upload-video-edit" */  'containers/page/video-setting/upload-video-edit'),
                    meta: {
                        isDisabled: true
                    }
                },
                {
                    name: '编辑视频',
                    path: 'uploadVideoEdit/:id',
                    component: () => import(/* webpackChunkName: "upload-video-edit" */  'containers/page/video-setting/upload-video-edit'),
                    meta: {
                        isDisabled: false
                    }
                },
            ]
        }
    ]
}