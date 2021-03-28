import axios from "axios";
import qs from "qs";

const defaultAxiosSetting = {
  baseURL: ".",
  timeout: 20000,
  withCredentials: false,
};
const CancelTokenCache = {};
const defaultResponseErrorHandler = (error) => Promise.reject(error);
const defaultResponseSuccessHandler = (response) => response;

const axiosClient = ({
  axiosSettings = {},
  responseErrorHandler = defaultResponseErrorHandler,
  responseSuccessHandler = defaultResponseSuccessHandler,
  requestIdHeader,
}) => {
  // code here
  const settings = { ...axiosSettings, ...defaultAxiosSetting };

  const instance = axios.create(settings);

  const request = (options) => {
    const { cancellable, ...others } = options;
    const { token, key } = cancellable;
    if (token) {
      return instance.request({ ...others, cancellable: token.token });
    }
    if (key) {
      if (CancelTokenCache[key]) {
        CancelTokenCache[key].cancel("Request cancelled due to new request");
      }
      const tokenSource = axios.CancelToken.source();
      CancelTokenCache[key] = tokenSource;
      return instance.request({ ...others, cancelToken: tokenSource.token });
    }
    return instance.request(options);
  };

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      console.log("Client respons", response);
      return responseSuccessHandler(response);
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return responseErrorHandler(error);
    }
  );

  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      console.log("request config", config);
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const defaultRequestParams = { params: {}, headers: {}, cancellable: false };

  const get = (
    url,
    { params = {}, headers = {}, cancellable = false } = defaultRequestParams
  ) =>
    request({
      method: "GET",
      url,
      params,
      headers,
      cancellable,
    });
  const getFile = (
    url,
    { params, headers = {}, cancellable = false, method = "GET" }
  ) =>
    request({
      method,
      url,
      params,
      headers,
      responseType: "arraybuffer",
      cancellable,
    });
  const post = (url, { data, headers = {}, cancellable = false }) =>
    request({
      method: "POST",
      url,
      data,
      headers: { ...headers },
      responseType: "json",
      cancellable,
    });
  const postAsJson = (url, { data, headers = {}, cancellable = false }) =>
    request({
      method: "POST",
      url,
      data,
      headers: { ...headers, ...{ "Content-Types": "application/json" } },
      responseType: "json",
      cancellable,
    });

  const postFormInput = (url, { data, headers = {}, cancellable = false }) =>
    request({
      method: "POST",
      url,
      data: qs.stringify(data),
      headers: {
        ...headers,
        ...{ "Content-Types": "application/x-www-form-urlencoded" },
      },
      responseType: "json",
      cancellable,
    });

  const putAsJson = (url, { data, headers = {}, cancellable = false }) =>
    request({
      method: "PUT",
      data,
      url,
      headers: { ...headers, ...{ "Content-Types": "application/json" } },
      responseType: "json",
      cancellable,
    });

  const putAsFormInput = (url, { data, headers = {}, cancellable = false }) =>
    request({
      method: "PUT",
      url,
      data: qs.stringify(data),
      headers: {
        ...headers,
        ...{ "Content-Types": "application/x-www-form-urlencoded" },
      },
      responseType: "json",
      cancellable,
    });

  const deleteByParams = (
    url,
    { params = {}, headers = {}, cancellable = false }
  ) =>
    request({
      method: "DELETE",
      headers,
      url,
      params,
      cancellable,
    });

  const deleteAsJson = (url, data, headers = {}, cancellable = false) =>
    request({
      method: "DELETE",
      data,
      url,
      headers: { ...headers, ...{ "Content-Types": "application/json" } },
      cancellable,
    });

  const blockDuplicateRequest = (key) => ({
    key,
  });
  return {
    get,
    post,
    postAsJson,
    postFormInput,
    putAsJson,
    putAsFormInput,
    getFile,
    deleteByParams,
    deleteAsJson,
    blockDuplicateRequest,
  };
};

export default axiosClient;
