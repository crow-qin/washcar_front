import chatApi from "../../apis/chat.api"
import { getResponseData } from '@/business/utils/response.js';

export default () => {
  return Promise
    .resolve(chatApi.getFriendList())
    .then(getResponseData)
}