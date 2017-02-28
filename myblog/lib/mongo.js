/**
 * Created by Citrus on 2017/2/28.
 */
let config = require('config-lite');
let Mongolass = require('mongolass');
let mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User',{
    name: {type: 'string'},
    password: {type: 'string'},
    gender: {type: 'string', enum: ['m', 'f', 'x']},
    bio: {type: 'string'}
});
exports.User.index({name: 1}, {unique: true}).exec();//根据用户名找到用户，用户名全局唯一