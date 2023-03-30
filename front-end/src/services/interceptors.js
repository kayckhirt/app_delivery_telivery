import { getToken } from '../utils/localStorage';

export function setAuthorizationHeader(req, token) {
  req.headers.Authorization = `${token}`;
}

function onRequest(config) {
  const user = getToken();
  if (user?.token) {
    setAuthorizationHeader(config, user.token);
  }
  return config;
}

function onRequestError(err) {
  return Promise.reject(err);
}

function onResponse(res) {
  return res;
}

function onResponseError(err) {
  return Promise.reject(err?.response?.data || err);
}

export function setupInterceptors(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
