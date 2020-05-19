import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export type BaseResponse = {
  statusCode: number;
  data: any;
}

interface BaseAjax {
  get: <T>(url: string, config?: object) => Promise<T>;
  post: <T>(url: string, data?: object, config?: object) => Promise<T>;
}

const BASE_URL =
  process.env.NODE_ENV == "development" ? "http://localhost:3000" : "";

const GetAxios = () => {
  const instance: AxiosInstance = Axios.create({
    baseURL: `${BASE_URL}`
  });
  instance.interceptors.request.use((config) => ({
    ...config,
    params: {
      // 此处注意，你的`params`应该是个对象，不能是其他数据类型
      ...(config.params || {}),
      // _: +new Date()
    }
  }));

  instance.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return Promise.resolve(response);
      } else {
        return Promise.reject('response 不存在');
      }
    },
    (error) => {
      return Promise.reject({
        statusCode: false,
        msg: error
      });
    }
  );

  const request = function <T>(config: AxiosRequestConfig = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      instance
        .request<BaseResponse>(config)
        .then((data) => {
          // 通过断言转换类型
          // 感觉这里这里有坑
          const __data = data.data as any;
          if (__data.statusCode) {
            resolve(__data);
          } else {
            reject(__data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  const Ajax: BaseAjax = {
    get: function <T>(url: string, config: object = {}): Promise<T> {
      return request<T>(
        Object.assign({}, config, {
          method: 'GET',
          url: url
        })
      );
    },
    post: function <T>(url: string, data: object = {}, config: object = {}): Promise<T> {
      return request<T>(
        Object.assign({}, config, {
          method: 'POST',
          url: url,
          data: data
        })
      );
    }
  };

  return Ajax;
};

export default GetAxios;