import indexRouter from './front';
import userRouter from './user';
import Router from 'koa-router'

const appRouter: Router[] = [
  indexRouter,
  userRouter,
]

export default appRouter