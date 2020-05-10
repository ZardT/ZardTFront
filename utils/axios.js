import axios from "axios";
import { message } from "antd";
// import { enterLogin } from "./enterRoute";

// axios 封装

axios.defaults.baseURL = `${
  process.env.NODE_ENV == "development" ? "http://192.168.0.168:7001" : ""
}/api/front`;
axios.defaults.headers["Content-Type"] = "application/json";
// console.log(axios.defaults);
// axios.defaults.token = "111";
axios.interceptors.request.use(
  function (config) {
    if (config.url.startsWith("/auth")) {
      const token = localStorage.getItem("token");
      token ? (config.headers.token = token) : null;
    }
    // 添加rpc字段
    return config;
  },
  function (error) {
    // console.log("请求错误");
    return Promise.resolve(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    // console.log(response);
    const {
      data,
      config: { url },
    } = response;

    if (data.code == 401) {
      message.error({
        title: "错误",
        content: "登录过期，请重新登录",
      });
      localStorage.clear();
      // setTimeout(() => {
      //   // enterLogin(false); // 退出登录
      // }, 2000);
    } else if (data.code == 200) {
      return data;
    } else {
      message.error({
        title: "错误",
        content: data.message,
      });
    }
    return data;
  },
  function (error) {
    message.error("网络错误");
    return Promise.resolve(error);
  }
);
export { axios };
