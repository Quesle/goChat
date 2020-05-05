import Koa from 'koa';
import path from 'path';

import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import json from 'koa-json';
// import session from 'koa-session2';
import serve from 'koa-static';
// import log4js from 'log4js';
// import logConfig from './config/log4js';

import router from './app/routes';
import errorHandle from './app/middlewares/error';

// log4js.configure(logConfig);
// const logger = log4js.getLogger();
// init server
const app = new Koa();

/**
 * Add Routes
 * Test: one app only support one router instance.
 */
app.use(router.routes()).use(router.allowedMethods());

// Add middlewares
app.use(convert(json()));
// https://cnodejs.org/topic/5761080bfa83165906ace310
app.use(convert(bodyParser({ multipart: true })));
app.use(convert(serve(path.join(process.cwd(), 'static'), {})));

// app.keys = ['secret'];
// app.use(convert(session({ store: new MongooseStore() }, app)));

// Add passport support
// app.use(passport.initialize());
// app.use(passport.session());

// Authenticate middleware, if is authenticated, continues request.
// app.use(authenticate);

// Use jwt token authentication.
app.use(errorHandle);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Koa2 server is running in http://localhost:${listener.address().port}`
  );
});
