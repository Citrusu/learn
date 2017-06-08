/**
 * Created by Citrus on 2017/6/1.
 */
var koa = require('koa');
var app = new koa();

app.use(function *(){
    this.body = 'Hello World';
});

app.listen(3000);
console.log('running...');