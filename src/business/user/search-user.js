import userApi from "../../apis/user.api";
import { getResponseData } from "../utils/response";

export default (params) =>
  Promise
    .resolve(userApi.searchUser(params))
    .then(getResponseData);
