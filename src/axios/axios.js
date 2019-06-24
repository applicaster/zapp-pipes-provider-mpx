import axiosBase from 'axios';
import {config} from "../config/index";
import {successHandler} from "./handler";
import {handler} from "./handler";

export const axios = axiosBase.create({
  baseURL: config.MPX.API_BASE_URL
});

axios.interceptors.response.use(successHandler, handler);