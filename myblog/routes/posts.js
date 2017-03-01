/**
 * Created by Citrus on 2017/2/28.
 */
let express = require('express');
let router = express.Router();

let checkLogin = require('../middlewares/check').checkLogin;
let PostModel = require('../models/posts');

//GET /posts 所有用户或者特定用户的文章页
//eg: GET /posts?author=xxx
router.get('/',(req, res, next) => {
    // res.send(req.flash());
    res.render('posts');
});

//GET /posts/create 发表文章页
router.get('/create', checkLogin, (req, res, next) => {
    res.render('create');
});

//POST /posts 发表一篇文章
router.post('/', checkLogin, (req, res, next) => {
    let author = req.session.user._id;
    let title = req.fields.title;
    let content = req.fields.content;

    //校检参数
    try{
        if(!title.length){
            throw new Error('请赶写标题');
        }
        if(!content.length){
            throw new Error('请填写内容');
        }
    }catch(e){
        req.flash('error', e.message);
        return res.redirect('back');
    }

    let post = {
        author: author,
        title: title,
        content: content,
        pv: 0
    };

    PostModel.create(post).then((result) => {
        //此 post 是插入 mongodb 后的值，包含 _id
        post = result.ops[0];
        req.flash('success', '发表成功');
        // 发表成功后跳转到该文章页
        res.redirect(`/posts/${post._id}`);
    }).catch(next);

});

//GET /posts/:postId 单独一篇文章页
router.get('/:postId', (req, res, next) => {
    res.send(req.flash());
});

//GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, (req, res, next) => {
    res.send(req.flash());
});

//POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, (req, res, next) => {
    res.send(req.flash());
});

//GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, (req, res, next) => {
    res.send(req.flash());
});

//POST /posts/:postId/comment //创建一条留言
router.post('/:postId/comment', checkLogin, (req, res, next) => {
    res.send(req.flash());
});

//GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, (req, res, next) => {
    res.send(req.flash());
});

module.exports = router;