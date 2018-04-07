import Koa from 'koa'
import globalConfig from './config'
import Router from 'koa-router'
import route from './routes'            //路由配置
import { Nuxt, Builder } from 'nuxt'
// express 
async function start() {
  const app = new Koa();
  const host = process.env.HOST || globalConfig.app.host;
  const port = process.env.PORT || globalConfig.app.port;
  const router = new Router();
  router.use('', route.routes())
  app.use(router.routes())
    .use(router.allowedMethods())


  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })
  
  app.listen(port, host);
  console.log('Server listening on' + host + ':' + port);
  // await
}
start();