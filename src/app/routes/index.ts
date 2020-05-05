import Router from 'koa-router';

import * as wx from './wx';
const router = new Router();

router.get('/', wx.wxGet);
router.post('/', wx.wxUse);

export default router;
