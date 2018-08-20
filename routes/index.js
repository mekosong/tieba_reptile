const router = require('koa-router')();

const reptileRouter = require('./reptile.router');
const tiebaRouter = require('./tieba.router');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});


router.use('/api/reptile',reptileRouter.routes());
router.use('/api/tieba',tiebaRouter.routes());

module.exports = router;
