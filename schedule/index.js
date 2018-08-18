const schedule = require('node-schedule');
const doClimbJob = require('./doClimbJob');
const config = require('../config');

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


  const everySixtySecond = '*/10 * * * * *';
  const isProduction = (cron) => config.isProduction ? cron : everySixtySecond;

  // 每10秒钟
  schedule.scheduleJob(isProduction('* */1 * * * *'), doClimbJob);
})();
