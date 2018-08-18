/**
 * 发送爬取小说的api请求
 */
const config = require('../config');

const request = require('request-promise-native');


module.exports = async function () {
  try{
    let body = await request({
      method:'post',
      url:'http://127.0.0.1:3000/api/reptile/doClimb',
      headers:{'Content-type': 'application/json'},
      json:{
        name:'da_zhu_zai'
      }
    });
    console.log(body)
  }catch (err){
    console.log(err)
  }

};

