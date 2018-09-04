// 帖子
const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const shared = require('./plugins/shared');

const s = new Schema({
  name: {
    type: String,
  },
  pwd:{
    type:String
  },
  grade:Number
});

s.plugin(shared);

mongoose.model('User', s);
