const router = require('koa-router')();
const tiebaController = require('../controller/tieba.controller');


router.post('/doClimb',tiebaController.doClimb);

module.exports = router;