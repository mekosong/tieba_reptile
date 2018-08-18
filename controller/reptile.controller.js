const logger = require('../lib/log4js.lib');


exports.doClimb = async function (ctx) {
  console.log(ctx.request.body)
  async function a(num){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(1)
        resolve(2 * num)
      }, 1000);
    } )
  }

  await a(2);
  console.log(2);
  ctx.body = {
    code: 200
  }
};