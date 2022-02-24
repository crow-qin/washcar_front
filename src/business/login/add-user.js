import api from '@/apis/common.api.js';
import { getResponseData } from '@/business/utils/response.js';

export default params => 
  Promise
    .resolve(api.addUser(params))
    .then(getResponseData);