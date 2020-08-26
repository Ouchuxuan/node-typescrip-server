import Koa from 'koa';
import "reflect-metadata";
import path from 'path';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser'
import { createConnection } from "typeorm";
import appRouter from './routes/index';
import loggerMiddleware from './middlewares/log';


const app = new Koa();


// middlewares
app.use(loggerMiddleware())
// 配置静态web服务器的中间件
app.use(bodyParser())
app.use(views(path.join(__dirname, '../src/views'), {
  extension: 'html'
}))

// databases
const connectDatabase = async () => {
  try {
    await createConnection();
  } catch (error) {
    console.error(error)
  }
}

connectDatabase();


// logger
app.use(async (ctx, next) => {
  await next();
  try {
    // 开始进入到下一个中间件
    if (ctx.status === 404) {
      ctx.throw(404);
    }
    // 记录响应日志
    ctx.logger.logResponse(ctx, new Date());
  } catch (error) {
    // 记录异常日志
    ctx.logger.logError(ctx, error, new Date());
  }
});

// router
appRouter.forEach(router => {
  app.use(router.routes()).use(router.allowedMethods())
})



app.listen(3000)
console.log('server is listening at port 3000')