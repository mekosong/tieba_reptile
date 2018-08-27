const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');
const config = require('../../../config/index');
const qiniu = require('../../../lib/qiniu');

const shared = {
  address: {
    province: {
      type: String
    },
    city: {
      type: String
    },
    region: {
      type: String
    },
    street: {
      type: String
    }
  },
  logoKey: {
    type: String
  },
  coverKey: {
    type: String
  },
  coverKeys: [{
    type: String
  }],
  nickname: {
    type: String,
    minlength: [1, '昵称必须有1个字符以上'],
    maxlength: [20, '昵称不能超过20个字符'],
    trim: true
  },
  avatarKey: {
    type: String,
    default:config.defaults.avatarKey
  },
  photoKeys: [{
    type: String,
    require: [true, '宝贝图片不能为空']
  }],
  videoKey: {
    type: String
  },
  videoKeys: [{
    type: String
  }],
  error: {
    type: String
  }
};

function virtuals (schema) {
  const paths = Object.keys(schema.paths);

  if (paths.includes('avatarKey')) {
    schema.virtual('avatar')
      .get(function () {
        if (/http/.test(this.avatarKey)) {
          return this.avatarKey;
        }
        const avatarKey = this.avatarKey ? this.avatarKey : config.defaults.avatarKey;
        return qiniu.url(avatarKey);
      })
      .set(function (v) {
        this.avatarKey = v;
      });
  }

  if (paths.includes('logoKey')) {
    schema.virtual('logo')
      .get(function () {
        return qiniu.url(this.logoKey ? this.logoKey : config.defaults.avatarKey);
      })
      .set(function (v) {
        this.logoKey = v;
      });
  }

  if (paths.includes('coverKey')) {
    schema.virtual('cover')
      .get(function () {
        return this.coverKey ? qiniu.url(this.coverKey) : undefined;
      })
      .set(function (v) {
        this.coverKey = v;
      });
  }

  if (paths.includes('coverKeys')) {
    schema.virtual('covers')
      .get(function () {
        return Array.isArray(this.coverKeys) ? this.coverKeys.map((c) => qiniu.url(c)) : undefined;
      })
      .set(function (v) {
        this.coverKeys = v;
      });
  }

  if (paths.includes('photoKeys')) {
    schema.virtual('photos')
      .get(function () {
        return Array.isArray(this.photoKeys) ? this.photoKeys.map((c) => qiniu.url(c)) : undefined;
      })
      .set(function (v) {
        this.photoKeys = v;
      });
  }

  if (paths.includes('videoKey')) {
    schema.virtual('video')
      .get(function () {
        return this.videoKey ? qiniu.url(this.videoKey) : undefined;
      })
      .set(function (v) {
        this.coverKey = v;
      });
  }

  if (paths.includes('videoKeys')) {
    schema.virtual('videos')
      .get(function () {
        return Array.isArray(this.videoKeys) ? this.videoKeys.map((c) => qiniu.url(c)) : undefined;
      })
      .set(function (v) {
        this.videoKeys = v;
      });
  }
}

function options (schema) {
  const hidefields = function (ret) {
    ['_id', '__v']
      .forEach(function (prop) {
        delete ret[prop];
      });
  };
  const covertDateFields = function (ret) {
    ['createdAt', 'auctionStartAt', 'auctionEndAt']
      .forEach(function (prop) {
        if (ret[prop]) {
          ret[prop] = moment(ret[prop]).format('YYYY-MM-DD HH:mm:ss');
        }
      });
  };
  const toJSONTransform = function (doc, ret, options) {
    hidefields(ret);
    // covertDateFields(ret);
    return ret;
  };
  const toObjectTransform = function (doc, ret, options) {
    // covertDateFields(ret);
    return ret;
  };

  schema.set('toObject', {
    virtuals: true,
    transform: toObjectTransform
  });
  schema.set('toJSON', {
    virtuals: true,
    transform: toJSONTransform
  });
  schema.set('timestamps', true);
  schema.set('usePushEach', true);
}

/**
 *
 * @param {Shema} schema
 * @param {Array} props shared props
 */
module.exports = function (schema, props) {
  // 所有资源添加是否冻结状态
  // 当用户状态为封停、删除时更改此状态为true，反之为false
  schema.add({
    freeze: Boolean,
    default: false
  });

  schema.statics.unfreeze = function (cb) {
    return this.find({ freeze: { $ne: true }}, cb);
  };

  if (props) {
    if (!Array.isArray(props)) {
      throw new TypeError('props must Array');
    }
    for (const prop of props) {
      schema.add({ [prop]: shared[prop] });
    }
  }

  virtuals(schema);
  options(schema);
  schema.index({
    createdAt: -1
  });
};
