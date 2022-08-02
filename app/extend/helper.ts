import crypto from 'crypto';
import lodash from 'lodash';

// MD5加密
const md5 = (str: string) => crypto
  .createHash('md5')
  .update(`${str}X5MvjI1jiSUIH1s46s-FkrHgvlj_uGWs1waomf9I`)
  .digest('hex');

// 处理响应体格式
// eslint-disable-next-line default-param-last
const handleResponseBody = (body, message = '', keys?: string[]) => ({
  code: 0,
  data: keys ? lodash.pick(body, keys) : body,
  message: message || 'Success!',
});

export { lodash, md5, handleResponseBody };
