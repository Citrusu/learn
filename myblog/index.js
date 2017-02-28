// let path = require('path');
let express = require('express');
let app = express();
let indexRouter = require('./routes/index');
let userRouter = require('./routes/users');

app.set('views', path.join(__dirname, 'views'));//设置存放模板文件目录
app.set('view engine', 'ejs');//设置模板引擎为 ejs

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000);

// app.use((req, res, next) => {
//    console.log('1');
//    next(new Error('err'));
// });
//
// app.use((req, res, next) => {
//     console.log(2);
//     res.status(200).end();
// });
//
// app.use((err, req, res, next) =>{
//     console.error(err.stack);
//     res.status(500).send('something broke!');
// });
//
// app.listen(3000);
