const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = Promise;
mongoose.set('useCreateIndex', true);

require('../server/model');

async function connectDb () {
  try {
    console.log('mongodb connect .... ',config.db);
    await mongoose.connect(config.db, {
      useNewUrlParser: true,
      replicaSet:'test-rc'
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = async () => {
  try {
    await connectDb();
  } catch (err) {
    process.exit(1);
  }
};
