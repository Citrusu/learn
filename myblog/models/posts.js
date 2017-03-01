/**
 * Created by Citrus on 2017/3/1.
 */
let marked = require('marked');
let Post = require('../lib/mongo').Post;

//将 post 的 content 从 markdown 转换成 html
Post.plugin('contentToHtml', {
   afterFind: (posts) => {
       return posts.map((post) => {
           post.content = marked(post.content);
           return post;
       });
   },
    afterFindOne: (post) => {
       if(post){
           post.content = marked(post.content);
       }
       return post;
    }
});

module.exports = {
    //创建一篇文章
    create: (post) => {
        return Post.create(post).exec();
    },

    //通过文章 id 获取 一篇文章
    getPostByid: (postId) => {
        return Post
            .findOne({_id: postId})
            .populate({path: 'author', model: 'user'})
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },

    //根据创建时间降序所有用户文章或者某个特定用户的所有文章
    getPosts: (author) => {
        let query = {};
        if(author){
            query.author = author;
        }
        return Post
            .find(query)
            .populate({path: 'author', model: 'User'})
            .sort({_id: -1})
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },

    //通过文章id 给 pv 加 1
    incPv: (postId) => {
        return Post
            .update({_id: postId}, {$inc: {pv: 1}})
            .exec();
    },

    //通过文章 id 获取一篇原生文章（编辑文章）
    getRawPostById: (postId) => {
        return Post
            .findOne({_id: postId})
            .populate({path: 'author', model: 'User'})
            .exec();
    },

    //通过用户 id 和文章 id 更新一篇文章
    updatePostById: (postId, author, data) => {
        return Post.update({author: author, _id: postId}, {$set: data}).exec();
    },

    //通过用户 id 和文章 id 删除一篇文章
    delPostById: (postId, author) => {
        return Post.remove({author: author, _id: postId}).exec();
    }
};
