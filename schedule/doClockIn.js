const request = require('request-promise-native');
const moment = require('moment');
let config = require('../config');

async function getUserSession(user) {
  if (!user.email || !user.passwd) {
    return false;
  }
  try {
    const res = await request({
      method: 'post',
      url: config.poro.loginInUrl,
      resolveWithFullResponse: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      form: {
        email: user.email,
        passwd: user.passwd,
        remember_me: 'week'
      }
    });

    let cookieArr = res.headers['set-cookie'];
    let sureCookie = cookieArr.map(one => one.split(';')[0]).join(';');
    return sureCookie;
  } catch (err) {
    console.log(err);
    return false;
  }

}

async function doCheckIn(session) {
  try {
    const clock = await request({
      method: 'post',
      url: config.poro.checkInUrl,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'Content-Type': 'application/json;charset=utf-8',
        'Cookie': session
      },
    });
    return JSON.parse(clock);
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function doClockIn() {
  let accounts = config.poro.accounts;

  for (let oneUser of accounts) {
    const userCookie = await getUserSession(oneUser);
    if (!userCookie) continue;
    console.log(`   --> Clock in start ==> ${oneUser.email}`);
    const resBody = await doCheckIn(userCookie);
    console.log(resBody);
    console.log(`   <-- ${moment().format('YYYY-MM-DD HH:mm:ss')} Clock in complete ==> ${oneUser.email}`);
  }
}


module.exports = doClockIn;

