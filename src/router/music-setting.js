const root = () => import(/* webpackChunkName: "home" */  'containers/home');
const container = () => import(/* webpackChunkName: "container" */  'containers/container');
export default {
    name: '音乐内容',
    path: '/musicSetting',
    redirect: '/musicSetting/specialSetting',
    component: root,
    children: [
        {
            name: '专辑管理',
            path: 'specialSetting',
            component: container,
            props:{
                level: 2,
                name: 'special-setting',
                component: () => import(/* webpackChunkName: "special-setting" */  'containers/page/music-setting/special-setting')
            },
            children:[
                {
                    name: '添加专辑',
                    path: 'specialSettingEdit',
                    component: () => import(/* webpackChunkName: "special-setting-edit" */  'containers/page/music-setting/special-setting-edit'),
                    meta: {
                        isDisabled: false
                    }
                },
                {
                    name: '查看专辑',
                    path: 'specialSettingEdit/:liveId',
                    component: () => import(/* webpackChunkName: "special-setting-edit" */  'containers/page/music-setting/special-setting-edit'),
                    meta: {
                        isDisabled: true
                    }
                },
                {
                    name: '编辑专辑',
                    path: 'specialSettingEdit/:liveId',
                    component: () => import(/* webpackChunkName: "special-setting-edit" */  'containers/page/music-setting/special-setting-edit'),
                    meta: {
                        isDisabled: false
                    }
                }
            ]
        },
        {
            name: '单曲管理',
            path: 'singleSetting',
            component: container,
            props:{
                level: 2,
                name: 'single-setting',
                component: () => import(/* webpackChunkName: "single-setting" */  'containers/page/music-setting/single-setting')
            },
            children:[
                {
                    name: '添加单曲',
                    path: 'singleSettingEdit',
                    component: () => import(/* webpackChunkName: "single-setting-edit" */  'containers/page/music-setting/single-setting-edit'),
                    meta: {
                        isDisabled: false
                    }
                },
                {
                    name: '查看单曲',
                    path: 'singleSettingEdit',
                    component: () => import(/* webpackChunkName: "single-setting-edit" */  'containers/page/music-setting/single-setting-edit'),
                    meta: {
                        isDisabled: true
                    }
                },
                {
                    name: '编辑单曲',
                    path: 'singleSettingEdit',
                    component: () => import(/* webpackChunkName: "single-setting-edit" */  'containers/page/music-setting/single-setting-edit'),
                    meta: {
                        isDisabled: false
                    }
                }
            ]
        },
        {
            name: 'mv上传管理',
            path: 'mvUploadSetting',
            component: container,
            props:{
                level: 2,
                name: 'mv-upload-setting',
                component: () => import(/* webpackChunkName: "mv-upload-setting" */  'containers/page/music-setting/mv-upload-setting')
            },
            children:[
                {
                    name: '上传MV',
                    path: 'mvUploadSettingEdit',
                    component: () => import(/* webpackChunkName: "single-setting-edit" */  'containers/page/music-setting/mv-upload-setting-edit'),
                    meta: {
                        isDisabled: false
                    }
                },
                {
                    name: '查看MV',
                    path: 'mvUploadSettingEdit',
                    component: () => import(/* webpackChunkName: "single-setting-edit" */  'containers/page/music-setting/mv-upload-setting-edit'),
                    meta: {
                        isDisabled: true
                    }
                },
                {
                    name: '编辑MV',
                    path: 'mvUploadSettingEdit',
                    component: () => import(/* webpackChunkName: "single-setting-edit" */  'containers/page/music-setting/mv-upload-setting-edit'),
                    meta: {
                        isDisabled: false
                    }
                }
            ]
        }
    ]
}