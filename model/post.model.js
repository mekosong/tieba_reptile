// 帖子
const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const shared = require('./plugins/shared');
const moment = require('moment');

const s = new Schema({
  title: {
    type: String,
    required: [true, '标题不能为空']
  },
  content: {
    type: String,
    required: [true, '正文不能为空']
  },
  type: {
    type: String,
  },
  user: { // 发帖者
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  likeCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'PostLike'
  }],
  reportCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  }
});

/**
 * 是否收藏、评论
 */
s.methods.likedAndCommented = async function (user) {
  const arr = await Promise.all([
    this.model('PostLike').count({user: user, post: this._id}),
    this.model('PostComment').count({user: user, post: this._id})
  ]);

  this._doc.liked = !!arr[0];
  this._doc.commented = !!arr[1];
};



s.plugin(shared, ['videoKey', 'photoKeys']);

s.index({
  type: 1,
  user: 1,
  createdAt: 1
});

mongoose.model('Post', s);
