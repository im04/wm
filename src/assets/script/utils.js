module.exports = {
    parseDom(arg) {
        let objE = document.createElement('div');
        objE.innerHTML = arg;
        return objE.childNodes && objE.childNodes[0];
    },
    randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    },
    pickerOptions: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
    },
    copyText(el) {
        if (document.selection) {
            let range = document.body.createTextRange();
            range.moveToElementText(el);
            range.select();
            document.execCommand("Copy");
        } else if (window.getSelection) {
            let range = document.createRange();
            range.selectNode(el);
            window.getSelection().addRange(range);
            document.execCommand("Copy");
            window.getSelection().removeAllRanges();
        }
    },
    copyByText(text) {
        let div = document.createElement('div'),
            body = document.body;
        div.innerText = text;
        div.style.width = 0;
        div.style.height = 0;
        body.appendChild(div);
        this.copyText(div);
        body.removeChild(div);
    },
    initTime(date) {
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + (date.getDate())
    },

    // ##### 业务工具方法 #####

    // 会员套餐
    getComboType() {
        let arr = [
            {value: '0', label: '安卓'},
            {value: '1', label: 'iOS'},
            {value: '2', label: '其它'}
        ];
        return arr;
    },
    getComboTypeText(value) {
        let result = '';
        let arr = this.getComboType();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value == value) {
                result = arr[i].label;
                break;
            }
        }
        return result;
    },

    // 套餐单位
    getComboUnitType() {
        let arr = [
            {value: '0', label: '日'},
            {value: '1', label: '周'},
            {value: '2', label: '月'},
            {value: '3', label: '季'},
            {value: '4', label: '年'}
        ];
        return arr;
    },
    getComboUnitTypeText(value) {
        let result = '';
        let arr = this.getComboUnitType();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value == value) {
                result = arr[i].label;
                break;
            }
        }
        return result;
    },

    // banner 展示风格
    getBannerStyle() {
        //0 轮播图 1 左右均分 2 左1右2 3 左2右1
        let arr = [
            {value: '0', label: '轮播图'},
            {value: '1', label: '左右均分'},
            {value: '2', label: '左1右2'},
            {value: '3', label: '左2右1'}
        ];
        return arr;
    },
    getBannerStyleText(value) {
        let result = '';
        let arr = this.getBannerStyle();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value == value) {
                result = arr[i].label;
                break;
            }
        }
        return result;
    },

    // banner 支持客户类型
    getBannerClientType() {
        //0 APP 1 PC
        let arr = [
            {value: '0', label: 'APP'},
            {value: '1', label: 'PC'}
        ];
        return arr;
    },
    getBannerClientTypeText(value) {
        let result = '';
        let arr = this.getBannerStyle();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value == value) {
                result = arr[i].label;
                break;
            }
        }
        return result;
    },


    listSortBy(arr, field, order) {

        let result = [];
        if (!arr) {
            return result;
        }

        result = arr.sort(function (obj1, obj2) {
            var value1 = obj1[field];
            var value2 = obj2[field];
            return value1 - value2;     // 升序
        });
        if (order == 'desc') result.reverse();

        return result;
    }
}