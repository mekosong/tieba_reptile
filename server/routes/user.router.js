const router = require('koa-router')();
const userController = require('../controller/user.controller');


router.post('/',userController.create);

router.post('/transfer',userController.transfer);

module.exports = router;