const request = require('request-promise-native');
let config = {
  url:'http://poro.ws/auth/login',
  email:'467746675@qq.com',
  passwd:'song123bo',
  remember_me:'week'
};


async function doClockIn(){
  try{
    const res = await request({
      method: 'post',
      url: config.url,
      resolveWithFullResponse: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
      },
      form:{
        email: config.email,
        passwd: config.passwd,
        remember_me: config.remember_me
      }
    });

    let cookieArr = res.headers['set-cookie'];
    let sureCookie = cookieArr.map(one=>one.split(';')[0]).join(';');
    console.log(sureCookie);
    console.log(JSON.parse(res.body))

    const clock = await request({
      method: 'post',
      url: 'http://poro.ws/user/checkin',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'Content-Type':'application/json;charset=utf-8',
        'Cookie':sureCookie
      },
      // json:{
      //   email: config.email,
      //   passwd: config.passwd,
      //   remember_me: config.remember_me
      // }
    });

    console.log(JSON.parse(clock));

  }catch (err){
    console.log(err)
  }

}


doClockIn();