import axios from 'axios';

export const getAccessToken = async () => {
  var url = 'https://api.weixin.qq.com/cgi-bin/token';
  url += '?grant_type=client_credential';
  url += '&appid=wx5a0ed165323df030';
  url += '&secret=0d4ef86da0db61d79b1a15cc9dfb5d62';

  const { data: { access_token } = {} as IObject } = await axios.get(url);
  return access_token;
};

export const uploadImage = async (token: string, path: string) => {};
