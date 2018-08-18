const router = require('koa-router')();
const reptileController = require('../controller/reptile.controller');

router.post('/doClimb', reptileController.doClimb);

module.exports = router;