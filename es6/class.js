/**
 * Created by Citrus on 2017/6/15.
 */
class Log {
    constructor() {
        this.sex = 'man';
    }

    toString(obj){
        obj.sex = this.sex;
        return JSON.stringify(obj);
    }
}

let person = {
    name: 'zy',
    age: 18
};

let my = new Log();
console.log(my.toString(person));