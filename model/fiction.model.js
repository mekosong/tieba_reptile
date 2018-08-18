// 帖子
const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const shared = require('./plugins/shared');

const s = new Schema({
  name: {
    type: String,
    trim: true, //去除两边的空格
    unique: true
  },  //小说名
  des: String, //小说说明
  headerImage: String, //小说首图链接
  author: String, //小说作者
  sectionArray: [{type: Schema.Types.ObjectId, ref: 'FactionContent'}], //小说章节列表, 每个元素是包含章节数、标题、章节内容的JSON
  updateTime: Date //更新时间
});

s.index({
  name: 1,
  author: 1,
  createdAt: 1
});

s.plugin(shared);
mongoose.model('Fiction', s);
