import axiosBase from 'axios';
import {successHandler, handler} from './handler';

export const axios = axiosBase.create();

axios.interceptors.response.use(successHandler, handler);