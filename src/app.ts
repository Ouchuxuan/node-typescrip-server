import Koa from 'koa';
import "reflect-metadata";
import path from 'path';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser'
import router from './routes/index';
const app = new Koa();

// 配置静态web服务器的中间件
app.use(bodyParser())
app.use(views(path.join(__dirname, '../src/views'), {
  extension: 'html'
}))



app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3000)
console.log('server is listening at port 3000')