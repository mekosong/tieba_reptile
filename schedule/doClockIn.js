const request = require('request-promise-native');
let config = require('../config');


async function doClockIn(){
  try{
    const res = await request({
      method: 'post',
      url: config.poro.loginInUrl,
      resolveWithFullResponse: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
      },
      form:{
        email: config.poro.email,
        passwd: config.poro.passwd,
        remember_me: 'week'
      }
    });

    let cookieArr = res.headers['set-cookie'];
    let sureCookie = cookieArr.map(one=>one.split(';')[0]).join(';');
    console.log(sureCookie);
    console.log(JSON.parse(res.body));

    const clock = await request({
      method: 'post',
      url: config.poro.checkinUrl,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'Content-Type':'application/json;charset=utf-8',
        'Cookie':sureCookie
      },
    });

    console.log(JSON.parse(clock));

  }catch (err){
    console.log(err)
  }

}

module.exports = doClockIn;