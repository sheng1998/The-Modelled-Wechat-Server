import crypto from 'crypto';
import lodash from 'lodash';

exports.lodash = lodash;

// MD5加密
exports.md5 = (str: string) => {
  return crypto
    .createHash('md5')
    .update(`${str}X5MvjI1jiSUIH1s46s-FkrHgvlj_uGWs1waomf9I`)
    .digest('hex');
};

// 处理响应体格式
exports.handleResponseBody = (body, message = '', keys?: string[]) => {
  return {
    code: 0,
    data: keys ? lodash.pick(body, keys) : body,
    message: message || 'Success!',
  }
};
