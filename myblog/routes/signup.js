/**
 * Created by Citrus on 2017/2/28.
 */
let express = require('express');
let router = express.Router();

let checkNotLogin = require('../middlewares/check').checkNotLogin;

//GET /signup 注册页
router.get('/signup', checkNotLogin, (req, res, next) => {
    res.send(req.flash());
});

//POST /signup 用户注册
router.post('/signup', checkNotLogin, (req, res, next) => {
    res.send(req.flash());
});

module.exports = router;