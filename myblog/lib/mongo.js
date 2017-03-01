/**
 * Created by Citrus on 2017/2/28.
 */
let config = require('config-lite');
let Mongolass = require('mongolass');
let mongolass = new Mongolass();
mongolass.connect(config.mongodb);

let moment = require('moment');
let objectIdToTimestamp = require('objectid-to-timestamp');

exports.User = mongolass.model('User',{
    name: {type: 'string'},
    password: {type: 'string'},
    avatar: {type: 'string'},
    gender: {type: 'string', enum: ['m', 'f', 'x']},
    bio: {type: 'string'}
});
exports.User.index({name: 1}, {unique: true}).exec();//根据用户名找到用户，用户名全局唯一

// 根据id 生成创建时间 created_at
mongolass.plugin('addCreatedAt',{
    afterFind: (results) => {
        results.forEach((item) => {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: (result) => {
        if(result){
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});