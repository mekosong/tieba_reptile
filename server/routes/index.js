const router = require('koa-router')();

const reptileRouter = require('./reptile.router');
const tiebaRouter = require('./tieba.router');
const userRouter = require('./user.router');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});


router.use('/api/reptile',reptileRouter.routes());
router.use('/api/tieba',tiebaRouter.routes());
router.use('/api/user',userRouter.routes());

module.exports = router;
