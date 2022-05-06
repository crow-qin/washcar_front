import chatApi from "../../apis/chat.api";
import { getResponseData } from '@/business/utils/response.js';

export default (params) => {
  return Promise
    .resolve(chatApi.getFriendsList(params))
    .then(getResponseData);
};
