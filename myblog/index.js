let path = require('path');
let express = require('express');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let flash = require('connect-flash');
let config = require('config-lite');
let routes = require('./routes');
let pkg = require('./package');

let app = express();

//设置模板全局常量
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

//添加模板必需的三个变量
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

//设置模板目录
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎为 ejs

//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
//session 中间件
app.use(session({
    name: config.session.key,//设置cookie中保存 session id 的字段名称
    secret: config.session.secret, //通过设置 secret 来计算hash值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, //强制更新 session
    saveUninitialized: false, //设置为false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge //过期时间，过期后 cookie 中的session id 自动删除
    },
    store: new MongoStore({
        url: config.mongodb //mongodb 地址
    }),
}));
//flash 中间件，用来显示通知
app.use(flash());

//路由
routes(app);

//监听商品，启动程序
app.listen(config.port, () => {
    console.log(`${pkg.name} listening on port ${config.port}`);
});