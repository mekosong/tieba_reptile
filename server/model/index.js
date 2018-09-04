/**
 * All models
 */
const mongoose = require('mongoose');

require('./post.model');
require('./fiction.model');
require('./fictionContent.model');
require('./user.model');

module.exports.Post = mongoose.model('Post');
module.exports.Fiction = mongoose.model('Fiction');
module.exports.FictionContent = mongoose.model('FictionContent');
module.exports.User = mongoose.model('User');
