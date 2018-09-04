const {
  User
} = require('../model');

const mongoose = require('mongoose');


exports.create = async function (ctx) {
  ctx.validate({
    name: v => v.required('name是必须的'),
    pwd: v => v.required('pwd是必须的'),
    grade: v => v.required('grade是必须的')
  }, ctx.request.body);

  const newUser = {
    name: ctx.request.body.name,
    pwd: ctx.request.body.pwd,
    grade: ctx.request.body.grade,
  };
  await User.create(newUser);

  ctx.body = {
    code: 200,
    message: '创建用户成功'
  }
};

exports.transfer = async function (ctx) {
  console.log(4444)
  ctx.validate({
    from: v => v.required('from是必须的').mongoId(),
    to: v => v.required('to是必须的').mongoId(),
    grade: v => v.required('grade是必须的')
  }, ctx.request.body);

  const {from, to, grade} = ctx.request.body;
  let theSession = await mongoose.startSession();
  theSession.startTransaction();
  try {
    const opts = {session:theSession, new: true};
    const A = await User.findOneAndUpdate({_id: from}, {$inc: {grade: -grade}}, opts);
    if (A.grade < 0) {
      // If A would have negative balance, fail and abort the transaction
      // `session.abortTransaction()` will undo the above `findOneAndUpdate()`
      await theSession.abortTransaction();
      theSession.endSession();
      ctx.body = {
        code: 200,
        message: 'from 的积分不足'
      }
    }else{
      const B = await User.findOneAndUpdate({_id: to}, {$inc: {grade: grade}}, opts);

      await theSession.commitTransaction();
      theSession.endSession();
      ctx.body = {
        code: 200,
        message: '转账成功'
      }
    }
  } catch (error) {
    console.log(error)
  }

};