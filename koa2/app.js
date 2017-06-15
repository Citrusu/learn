/**
 * Created by Citrus on 2017/6/12.
 */
const Koa = require('koa');
const convert = require('koa-convert');
// const generator_mid = require('./middleware/generator_mid');
const generator_mid = require('./middleware/koa2_mid');
const app = new Koa();

// app.use(convert(generator_mid()));
app.use(generator_mid());

app.use((ctx) => {
    ctx.body = 'hello koa2';
});

app.listen(3000);

console.log(`listen port 3000`);