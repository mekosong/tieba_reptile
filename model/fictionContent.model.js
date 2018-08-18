// 帖子
const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const shared = require('./plugins/shared');

const s = new Schema({
  sectionNum: {
    type: Number
  },
  sectionTitle: String,
  sectionContent: String,
  sectionResource: String,//小说来源
  recentUpdateTime: Date  //最新的更新时间，用来比对最新文章
});

s.index({
  name: 1,
  author: 1,
  createdAt: 1
});

s.plugin(shared);
mongoose.model('FictionContent', s);
