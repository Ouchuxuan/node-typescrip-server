import Koa from 'koa';
import KoaStatic from 'koa-static';
import path from 'path';
import views from 'koa-views';
import router from './routes/index';
const app = new Koa();

// 配置静态web服务器的中间件
// app.use(KoaStatic(path.join(__dirname)))

app.use(views(path.join(__dirname, '../views'), {
  extension: 'html'
}))

app.use(async (ctx, next) => {
  console.log(5656656)
  await ctx.render('index')
  await next()
})

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3000)
console.log('server is listening at port 3000')