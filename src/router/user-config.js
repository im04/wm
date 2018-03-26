const root = () => import(/* webpackChunkName: "home" */  'containers/home');
const container = () => import(/* webpackChunkName: "container" */  'containers/container');
export default {
    name: '用户信息',
    path: '/userConfig',
    component: root,
    redirect: '/userConfig/userList',
    children: [
        {
            name: '用户列表',
            path: 'userList',
            component: container,
            props:{
                level: 2,
                name: 'user-list',
                component:() => import(/* webpackChunkName: "user-list" */  'containers/page/user-config/user-list')
            },
            meta: {
                level: 2
            },
            children:[{
                name: '添加内部账号',
                path: 'userEdit',
                component: () => import(/* webpackChunkName: "user-edit" */  'containers/page/user-config/user-edit')
            }]
        },
        {
            name: '购买订单',
            path: 'orderList',
            component: () => import(/* webpackChunkName: "order-list" */  'containers/page/user-config/order-list')
        },
        {
            name: '会员充值',
            path: 'memberRecharge',
            component: () => import(/* webpackChunkName: "member-recharge" */  'containers/page/user-config/member-recharge')
        },
        {
            name: '哇币兑换',
            path: 'coinExchange',
            component: () => import(/* webpackChunkName: "coin-exchange" */  'containers/page/user-config/coin-exchange')
        }
    ]
}