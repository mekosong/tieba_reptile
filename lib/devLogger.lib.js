const bytes = require('bytes');

module.exports = async function(ctx,next){
  if(process.env.NODE_ENV !=='production'){
    const start = Date.now();
    console.log('  <-- '+ctx.method +' '+ctx.url );
    console.log('>>>>>  query:'+JSON.stringify(ctx.request.query)+',  body:'+JSON.stringify(ctx.request.body)+'  <<<<<');
    try {
      await next()
    } catch (err) {
      // log uncaught downstream errors
      console.log(err);
      // console.log('error...'+JSON.stringify(err.message));
      log(ctx, start, null, err);
      throw err
    }

    const res = ctx.res;

    const onfinish = done.bind(null, 'finish');
    const onclose = done.bind(null, 'close');

    res.once('finish', onfinish);
    res.once('close', onclose);

    function done (event) {
      res.removeListener('finish', onfinish);
      res.removeListener('close', onclose);

      log(ctx, start,ctx.response.length, null, event)
    }

    function log(ctx, start, len, err, event){
      const status = err
        ? (err.isBoom ? err.output.statusCode : err.status || 500)
        : (ctx.status || 404);

      let length;
      if (~[204, 205, 304].indexOf(status)) {
        length = ''
      } else if (len == null) {
        length = '-'
      } else {
        length = bytes(len).toLowerCase()
      }

      const upstream = err ? 'xxx': event === 'close' ? '-x-':'-->';
      console.log('  ' + upstream +
        ' ' + '%s' +
        ' ' + '%s' +
        ' ' + '%s' +
        ' ' + '%s' +
        ' ' + '%s',
        ctx.method,
        ctx.originalUrl,
        status,
        time(start),
        length)
    }
    function time (start) {
      const delta = Date.now() - start;
      return delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's'
    }
  }else{
    await next();
  }

};
