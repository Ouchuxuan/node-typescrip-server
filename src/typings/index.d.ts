
import { logUtil } from '../middlewares/log';

declare module 'koa' {
    interface BaseContext {
        render(path: string): any;
        logger: logUtil
        session: any;
    }
}