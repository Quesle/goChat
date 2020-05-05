import * as api from './wxApi';
import Router from 'koa-router';

const newToken = 'HelloWeChat';

const router = new Router();
/*首次接入微信，验证url是否畅通*/
//这里的路径设为wx,这里的token必须与微信后台一致
export const wxGet = (req: IObject, res: IObject, next: any) => {
  const token = newToken;
  //获取微信服务器发来的参数
  const signature = req.query.signature;
  const timestamp = req.query.timestamp;
  const echostr = req.query.echostr;
  const nonce = req.query.nonce;
  console.log('====>>>>', token, signature, timestamp, echostr, nonce);
  //按字典进行排序
  const oriArray = [nonce, timestamp, token];
  oriArray.sort();
  //sha1加密
  const original = oriArray.join('');
  const jsSHA = require('jssha'); //加密模块，自己添加
  const shaObj = new jsSHA('SHA-1', 'TEXT');
  shaObj.update(original);
  const scyptoString = shaObj.getHash('HEX');
  //判断签名是否相同
  if (signature == scyptoString) {
    //验证成功
    res.status(200).send(echostr);
  } else {
    res.send('error');
    return false;
  }
  next();
};

/*微信模块*/
const wechat = require('wechat');
/*改写*/
const config = {
  token: newToken,
  appid: 'wx5a0ed165323df030',
  appsecret: '0d4ef86da0db61d79b1a15cc9dfb5d62',
  encodingAESKey: 'PBeEb1kgY5L4zh2xQnU6BYwW9B8Ej2rAlnOi9Ur7cEt',
};
export const wxUse = wechat(config)
  .text(async (message: IObject, req: IObject, res: IObject, next: any) => {
    const accessToken = await api.getAccessToken();
    /*接收文本时执行的操作*/
    if (message.Content === 'tp') {
      res.reply({
        type: 'image',
        content: {
          mediaId: '',
        },
      });
    } else if (message.Content === 'yy') {
      res.reply({
        title: '',
        description: '',
        musicUrl: '',
        hqMusicUrl: '',
        thumbMediaId: '',
      });
    } else if (message.Content === 'tw') {
      //图文
      res.reply([
        {
          title: '',
          description: '',
          picurl: '',
          url: '',
        },
      ]);
    } else if (message.Content === 'yy') {
      //图文音乐
      res.reply({
        type: 'music',
        content: {
          title: '',
          description: '',
          musicUrl: '',
          hqMusicUrl: '',
          thumbMediaId: '',
        },
      });
    } else if (message.Content === 'YY') {
      //语音
      res.reply({
        type: 'voice',
        content: {
          mediaId: '',
        },
      });
    } else if (message.Content === 'sp') {
      //视频
      res.reply({
        type: 'video',
        content: {
          title: '',
          description: '',
          mediaId: '',
        },
      });
    } else {
      res.reply(
        '回复tp查看图片\n' +
          '回复YY接收语音\n' +
          '回复tw查看图文\n' +
          '回复yy收听歌曲（未完善）\n' +
          '回复sp查看视频（未完善）\n'
      );
    }
  })
  .image(function (message: IObject, req: IObject, res: IObject, next: any) {
    // 图片类型
    res.reply({
      type: 'image',
      content: {
        mediaId: '',
      },
    });
  })
  .voice(function (message: IObject, req: IObject, res: IObject, next: any) {
    // 语音类型
    res.reply({
      type: 'voice',
      content: {
        mediaId: '',
      },
    });
  })
  .video(function (message: IObject, req: IObject, res: IObject, next: any) {
    // 视频类型
    res.reply({
      type: 'video',
      content: {
        title: '',
        description: '',
        mediaId: '',
      },
    });
  })
  .location(function (message: IObject, req: IObject, res: IObject, next: any) {
    // TODO
  })
  .link(function (message: IObject, req: IObject, res: IObject, next: any) {
    // TODO
  })
  .event(function (message: IObject, req: IObject, res: IObject, next: any) {
    // TODO
  })
  .device_text(function (
    message: IObject,
    req: IObject,
    res: IObject,
    next: any
  ) {
    // TODO
  })
  .device_event(function (
    message: IObject,
    req: IObject,
    res: IObject,
    next: any
  ) {
    // TODO
  })
  .middlewarify();
