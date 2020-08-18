
import { BaseContext } from 'koa';
 
declare module 'koa' {
    interface BaseContext {
        render(path:string): any;
        session:any;
    }
  }