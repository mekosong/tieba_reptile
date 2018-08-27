const router = require('koa-router')();
const reptileController = require('../controller/reptile.controller');
const tiebaController = require('../controller/tieba.controller');

router.post('/doNothing', reptileController.doNothing);


module.exports = router;