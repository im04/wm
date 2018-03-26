<template>
    <div class="tab-static">
        <div class="tab-static-head">
        <ul>
            <li :class="{active:class1}"><router-link to="/userConfig/orderList">购买订单</router-link></li>
            <li :class="{active:class2}"><router-link to="/userConfig/memberRecharge">会员充值</router-link></li>
            <li :class="{active:class3}"><router-link to="/userConfig/coinExchange">哇币兑换</router-link></li>
        </ul>
        <div style="clear: both"></div>
        </div>
    </div>
</template>
<style type="text/css">
    .tab-static{
        border-bottom: 1px solid #4f88bb;
    }
    .tab-static .tab-static-head{
        margin-bottom: -1px;
    }
    .tab-static ul{
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        margin-top: 0;
        margin-bottom: 10px;
    }
    .tab-static ul li.active{
        border-bottom-color: #f4f4f4;
        background-color: #fff;
    }
    .tab-static ul li{
        margin-left: 15px;
        border-radius: 4px 4px 0 0;
        border: 1px solid #4f88bb;
        font-size: 14px;
        color: #fff;
        background-color: #4f88bb;
        cursor: pointer;
        float: left;
        position: relative;
        display: block;
    }
    .tab-static ul li a{
        margin-right: 2px;
        line-height: 1.42857143;
        border: 1px solid transparent;
        border-radius: 4px 4px 0 0;
        position: relative;
        display: block;
        padding: 10px 15px;
        color: #fff;
    }
    .tab-static ul li a:hover{
        color: #fff;
    }
    .tab-static ul li.active a,.tab-static ul li.active a:hover{
        color: #333;
    }
</style>
<script>
    export default {
        props: {
            currentTabMenu: 0
        },
        data() {
            return {
                class1: this.currentTabMenu == 1 ? true : false,
                class2: this.currentTabMenu == 2 ? true : false,
                class3: this.currentTabMenu == 3 ? true : false
            }
        }
    }
</script>

