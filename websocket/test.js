const Koa = require('koa');
const app = new Koa();

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

app.use(async (ctx, next) => {
	console.log(`${ctx.request.method} ${ctx.request.url}...`);
	await next();
});

router.get('/', async (ctx, next) => {
	ctx.response.body = `<h1>Login</h1>
		<form method="post" action="/signin">
			<input type="text" name="name">
			<input type="password" name="password">
			<input type="submit" value="提交">
		</form>
	`;
});

router.post('/signin', async (ctx, next) => {
	let name = ctx.request.body.name || '';
	let password = ctx.request.body.password || '';
	console.log(name +':'+ password);
	if(name == 'citrus' && password == '123456'){
		ctx.response.body = `hello, ${name}`;
	}else{
		ctx.response.body = 'login fail';
	}
})

router.get('/hello/:name', async (ctx, next) => {
	let name = ctx.params.name;
	ctx.response.body = `Hello ,${name} !`;
});

app.use(router.routes());

app.listen(3000);
console.log('server listening port 3000');