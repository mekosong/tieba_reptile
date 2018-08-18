console.log(`the NODE_ENV is:${process.env.NODE_ENV}`);
module.exports = require(`./${process.env.NODE_ENV || 'local'}`);
