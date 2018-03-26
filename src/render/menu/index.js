/**
 *  menu
 *  用于生成无限级菜单栏
 *  createElement Function : vue render函数返回的内置函数
 *  config Object : 配置对象  配置选项参照 vue 的 vnode 接口
 */
import {
    Submenu,
    MenuItem,
    Menu
} from 'element-ui';
export default function(createElement, config) {
    let forEach = function (data) { //遍历辅助函数
        let arr = [],
            len = data.length;
        for (let i = 0; i < len; i++) {
            arr.push(createEl(data[i]));
        }
        return arr;
    };
    let createEl = function (data) {//创建menu选项辅助函数
        if (data.children) {
            return createElement(Submenu,
                Object.assign({
                    props: {
                        index: data.path
                    }
                },data.option),
                [createElement('template', {
                slot : 'title',
            },createTitle(data)),...forEach(data.children)]);
        } else {
            return createElement(MenuItem,Object.assign({
                    props: {
                        index: data.path
                    }
                },data.option),
                [
                    createElement('template', {
                        slot: 'title'
                    },createTitle(data))
                ]
            )
        }
    };
    let createTitle = function(data) {//创建标题的辅助函数
        let icon = data.iconClass;
        return icon?[createElement('div',{
            class: icon
        }),data.name]:data.name;
    };
    return createElement(
        Menu,
        config.option||{},
        forEach(config.menuData, '')
    )
}
