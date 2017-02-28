/**
 * Created by Citrus on 2017/2/28.
 */
let config = require('config-lite');
let Mongolass = require('mongolass');
let mongolass = new Mongolass();
mongolass.connect(config.mongodb);