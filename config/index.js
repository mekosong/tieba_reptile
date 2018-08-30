console.log(`the NODE_ENV is:${process.env.NODE_ENV|| 'local'}`);
module.exports = require(`./${process.env.NODE_ENV || 'local'}`);
