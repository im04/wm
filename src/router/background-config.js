const root = () => import(/* webpackChunkName: "home" */  'containers/home');
const container = () => import(/* webpackChunkName: "container" */  'containers/container');
export default {
    name: '后台基础配置',
    path: '/backgroundConfig',
    component: root,
    redirect: '/backgroundConfig/liveRoomConfig',
    children: [
        {
            name: '直播厅配置',
            path: 'liveRoomConfig',
            component: container,
            props:{
                level: 2,
                name: 'live-room-config',
                component: () => import(/* webpackChunkName: "live-room-config" */  'containers/page/background-config/live-room-config')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: '添加直播厅',
                    path: 'liveRoomConfigEdit',
                    component: () => import(/* webpackChunkName: "live-room-config-edit" */  'containers/page/background-config/live-room-config-edit'),
                }
            ]
        },
        {
            name: '一二级分类管理',
            path: 'classifySetting',
            component: () => import(/* webpackChunkName: "classify-setting" */  'containers/page/background-config/classify-setting')
        },
        {
            name: '标签组管理',
            path: 'tagGroupSetting',
            component: container,
            props:{
                level: 2,
                name: 'tag-group-setting',
                component: () => import(/* webpackChunkName: "tag-group-setting" */  'containers/page/background-config/tag-group-setting')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: '添加标签组',
                    path: 'tagGroupSettingEdit',
                    component: () => import(/* webpackChunkName: "tag-group-setting-edit" */  'containers/page/background-config/tag-group-setting-edit'),
                }
            ]
        },
        // {
        //     name: '内部账号管理',
        //     path: 'innerAccountSetting',
        //     component: () => import(/* webpackChunkName: "inner-account-setting" */  'containers/page/background-config/inner-account-setting')
        // },
        {
            name: '部门管理',
            path: 'departmentSetting',
            component: container,
            props:{
                level: 2,
                name: 'department-setting',
                component: () => import(/* webpackChunkName: "department-setting" */  'containers/page/background-config/department-setting')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: '添加部门',
                    path: 'departmentSettingEdit',
                    component: () => import(/* webpackChunkName: "department-setting-edit" */  'containers/page/background-config/department-setting-edit'),
                }
            ]
        },
        {
            name: '员工管理',
            path: 'employeeSetting',
            component: container,
            props:{
                level: 2,
                name: 'employee-setting',
                component: () => import(/* webpackChunkName: "employee-setting" */  'containers/page/background-config/employee-setting')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: '添加成员',
                    path: 'employeeSettingEdit',
                    component: () => import(/* webpackChunkName: "employee-setting-edit" */  'containers/page/background-config/employee-setting-edit'),
                }
            ]
        },
    ]
}