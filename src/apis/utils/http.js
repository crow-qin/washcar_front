import axios from 'axios';
import { getToken } from '@/utils/auth.util.js';

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = getToken();
    // config.headers.locale = 'zh-CN';
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
class Http {
  getSysUrl(SYS, url) {
    return SYS + url;
  }
    /**
   * 将参数的null转变为空字符串
   * @param {JSON} params
   */
  handleParams(params) {
    if (!(params instanceof Object)) {
      if (params || params !== null) {
        return params;
      }
      return '';
    }
    let tempParams;
    if (params instanceof Array) {
      tempParams = [...params];
    } else {
      tempParams = { ...params };
    }
    for (const key in params) {
      tempParams[key] = this.handleParams(params[key]);
    }
    return tempParams;
  }

  async fetch(url, config) {
    try {
      return await axios.get(url, config);
    } catch (err) {
      console.error(err);
      throw (err);
    }
  }
  async postJson(url, data, config) {
    try {
      return await axios.post(url, this.handleParams(data), config);
    } catch (err) {
      console.error(err);
      throw (err);
    }
  }
}
export default new Http();
