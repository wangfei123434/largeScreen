import axios, {AxiosError, AxiosRequestConfig, Canceler} from "axios";
import router from "../router";
//AxiosResponse
const instance = axios.create({
  baseURL: "/",
  timeout: 120000,
  // headers: {'X-Custom-Header': 'foobar'}
});
// 添加请求拦截器
instance.interceptors.request.use(
  (config:any) => {
    // 在发送请求之前做些什么
    // config.headers.Authorization = localStorage.getItem("token");
    // return config;

    // 新增登录修改
    const urls = ["oauth/token"];
    const inUrl = urls.some((url) => config.url?.includes(url));
    if (!inUrl) {
      console.log("非登录接口");
      if(sessionStorage.getItem("token")){
        Object.assign(config.headers, {
          "Dsj-Auth": 'bearer ' + sessionStorage.getItem("token"),
          Authorization: 'bearer ' + sessionStorage.getItem("token"),
        });
      }else{
        Object.assign(config.headers, {
          "Dsj-Auth": sessionStorage.getItem("token"),
          Authorization: sessionStorage.getItem("token"),
        });
      }
    }else{
      // console.log("登录接口");
      Object.assign(config.headers, {
        Authorization:config.Authorization,
        'Captcha-Code':config.CaptchaCode,
        'Captcha-Key':config.CaptchaKey
      });
    }
    return config
  },
  (error:any) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export interface Res {
  [x: string]: any;
  code: number;
  data: any;
  info?: string;
}
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { status } = response;
    const { code, data, info, msg } = response.data as Res;
    const err: string = info || msg;
    if (isNaN(code)) {
      return Promise.resolve(response.data);
    }
    if (status == 200) {
      if (code == 0 || code == 200) {
        return response.data;
      } else {
        return Promise.reject(err);
      }
    } else if (status == 500) {
      return Promise.reject(err);
    } else {
      return Promise.reject(err);
    }
  },
  async (error: AxiosError) => {
    if (error instanceof axios.Cancel) {
      console.warn("请求已取消");
      return new Promise(() => ({}));
    }
    if (error.response) {
      const { status } = error.response;
      if (status == 401) {
        sessionStorage.removeItem("token");
        await router.replace("/login");
        return new Promise(() => console.log());
      }
    }
    // 对响应错误做点什么
    // return Promise.reject(error.message);

    // 新增登录修改
    return Promise.reject(
      error.response?.data.msg || error.response?.data.error_description
    );
  }
);
export interface Options extends AxiosRequestConfig{
  message?: boolean; //是否提示
  aborts?: Canceler[]; //取消请求
  errMessage?: boolean; // 错误提示
  [x: string]: any;
}
const request = (promise: Promise<Res>, options?: Options) => {
  return promise
    .then((res) => {
      const { data, info, msg } = res;
      return Promise.resolve(res);
    })
    .catch((msg = "") => {
      if (options) {
        const { errMessage = true } = options;
      }
      return Promise.reject(msg);
    })
    .finally(() => {
    });
};
//取消请求
const createCancel = (aborts: Canceler[] | undefined) => {
  if (aborts?.length) {
    aborts?.forEach((cancel) => cancel());
    aborts.length = 0;
  }
  const CancelToken = axios.CancelToken;
  if (Array.isArray(aborts)) {
    return {
      cancelToken: new CancelToken((cancel:any) => {
        // executor 函数接收一个 cancel 函数作为参数
        aborts.push(cancel);
      }),
    };
  } else {
    return {};
  }
};
export default {
  instance,
  request,
  get(
    url: string,
    data?: Record<string, any>,
    options?: Options
  ): Promise<Res> {
    const cancels = createCancel(options?.aborts);
    Object.assign(cancels, options);
    return request(
      instance.get(url, { params: data || {}, ...cancels }),
      options
    );
  },
  post(
    url: string,
    data?: Record<string, any>,
    options?: Options
  ): Promise<Res> {
    const cancels = createCancel(options?.aborts);
    Object.assign(cancels, options);
    return request(instance.post(url, data, cancels), options);
  },
};
