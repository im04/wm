const allWeek = ['日','一','二','三','四','五','六'];
const oneWeek = 7 * 86400000;
function initDate(time) {//格式化日期
    time = new Date(time);
    return time.getFullYear() + '-' + fillTime(time.getMonth()+1) + '-' + fillTime(time.getDate());
}
function fillTime(num) {//填充零
    return num <= 9 ? '0'+num : num;
}

class weekDataCreater{
    constructor(len = 4) {
        this.len = len;
        this.startDay = Date.now() - (this.len * oneWeek);
        return this.count();
    }
    count() {
        let arr = [];
        let len = 2 * this.len +1;
        for (let i = 0; i < len; i++) {
            arr.push(this.checkDay(i))
        }
        return {
            dataList: arr,
            index: this.len
        };
    }
    checkDay(i) {//计算相对日期
        return this.createWeek(new Date(this.startDay + i * oneWeek))
    }
    createWeek(time) {//创建对象List
        let arr = [],
            Time = time.getTime(),
            day = time.getDay(),
            mon = Time - day * 86400000;
        for (let i = 0; i < 7; i++) {
            let t = mon + i * 86400000;
            arr.push({
                day: '星期' + allWeek[i],
                date: initDate(t)
            })
        }
        return arr;
    }
}
weekDataCreater.initDate = initDate;
weekDataCreater.fillTime = fillTime;

export default weekDataCreater;
