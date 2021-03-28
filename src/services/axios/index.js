import axiosClient from "./axiosClient";

const successHandler = (response) => {
  console.log(
    "api success response interceptors",
    response.status,
    response.data
  );
  return Promise.resolve(response.data);
};

const errorHandler = (error) => {
  console.log("api response error interceptors", error);
  return Promise.reject(error);
};

const Api = axiosClient({
  axiosSettings: { baseURL: ".", timeout: 30000, withCredentials: false },
  responseErrorHandler: (error) => errorHandler(error),
  responseSuccessHandler: (response) => successHandler(response),
});

export default Api;
