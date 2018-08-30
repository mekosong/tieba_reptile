const schedule = require('node-schedule');
const doClockIn = require('./doClockIn');

(async () => {
  // *     *     *     *     *     *
  // ┬    ┬    ┬    ┬    ┬    ┬
  // │    │    │    │    │    │
  // │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
  // │    │    │    │    └───── month (1 - 12)
  // │    │    │    └────────── day of month (1 - 31)
  // │    │    └─────────────── hour (0 - 23)
  // │    └──────────────────── minute (0 - 59)
  // └───────────────────────── second (0 - 59, OPTIONAL)


  // 每隔5个小时签到一次，宁多签不漏签
  schedule.scheduleJob('0 0 */5 * * *', doClockIn);
})();
