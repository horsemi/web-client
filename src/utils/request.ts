import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import router from '@/router'
import { MessageBox, Message } from 'element-ui';
import { MAINHOST, ISMOCK, conmomPrams } from '@/config';
import authService from '@/utils/auth';

/**
 * 若系统参数NODE_ENV不为正式环境或为空，默认去本地
 */
const baseURL = process.env.NODE_ENV === 'production' ? MAINHOST : location.origin;

export interface IRequest {
    /**
     * @description axios封装后的GET，每次调用会实例一个Axios
     * @param url
     * @param data 
     * @param config 
     */
    get(url: string, data?: {}, config?: {}): Promise<any>;

    /**
     * @description axios封装后的POST，每次调用会实例一个Axios
     * @param url 
     * @param data 
     * @param config 
     */
    post(url: string, data?: {}, config?: {}): Promise<any>;

    /**
     * @description axios封装后的POST，提交上传文件为主
     * @param url 
     * @param fileInfo 单个文件上传
     * @param formParams 多个文件上传
     */
    upload(url: string, fileInfo: File | {key: string, file: File}, formParams?: any): Promise<any>;

    /**
     * @description axios封装后的GET，下载文件为主
     * @param url 
     * @param data 
     * @param config 
     */
    download(url: string, data?: {}, config?: {}): Promise<any>;
}

class Request implements IRequest {

  public async get(url: string, data: any = {}, config: any = {}) {
    const params = Object.assign({ params: data}, config);
    const response = await this.createAxiosInstance().get(url, params);
    return response;
  }

  public async post(url: string, data: any = {}, config: any = {}) {
    const params = Object.assign(
      { params: data}, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} }, config);
    const response = await this.createAxiosInstance().post(url, params);
    return response;
  }

  public async upload(url: string, fileInfo: File | {key: string, file: File}, formParams?: any) {
    let fileData = new FormData();

    if (formParams) {
      for (let i in formParams) {
        fileData.append(i, formParams[i]);
      }
    }

    if (fileInfo instanceof File) {
      fileData.append('file', fileInfo, fileInfo.name);
    } else {
      // XXX: 不知道有没有必要
      fileData.append(fileInfo.key, fileInfo.file, fileInfo.file.name);
    }
    fileData.append('chunk', '0');  // 分割数据
    const params = Object.assign({ headers: { 'Content-Type': 'multipart/form-data'} });
    const response = await this.createAxiosInstance().post(url, fileData, params);
    return response;
  }

  public async download(url: string, data?: {}, config?: {}) {
    const params = Object.assign({ params: data }, { responseType: 'arraybuffer' }, config);
    const response = await this.createAxiosInstance().get(url, params);
    return response;
  }

  /**
   * @description axios实例化
   */
  private createAxiosInstance(): AxiosInstance {
      const service = axios.create({
          /**
           * `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
           * 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
           * url = base url + request
           */
          baseURL: baseURL,
          timeout: 5000   // 超时时间
      });

      // 请求拦截
      service.interceptors.request.use((config: AxiosRequestConfig) => {
          const token = authService.Token;
          if (token) {
              // let each request carry token
              // ['X-Token'] is a custom headers key
              // please modify it according to the actual situation
              config.headers['X-Token'] = token
          }
          return config;
      }, (error: any) => {
          // TODO: 
          console.error(error);
          return Promise.reject(error);
      });

      // 响应拦截
      service.interceptors.response.use((res: AxiosResponse) => {
          const { data, status } = res;

          // TODO: 可以做个网关
          if (status === 200 && ISMOCK) {
              // 响应是来自MOCK数据，直接返回数据
              return data;
          }
          if (status === 200 && data && data.code === 0) {
              return data;
          }

          // 自定义code if the custom code is not 20000, it is judged as an error.
          if (data.code !== 20000) {
              Message({
                  message: data.message || 'Error',
                  type: 'error',
                  duration: 5 * 1000
              })

              // 自定义code 状态50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
              if (data.code === 50008 || data.code === 50012 || data.code === 50014) {
                  // to re-login
                  MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                      confirmButtonText: '重新登录',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
                      // TODO: 跳转回登录页面
                      return router.replace({ name: 'login' });
                  })
              }
              return Promise.reject(new Error(data.message || 'Error'))
          }
      }, (error: any) => {
          console.log('err' + error) // for debug
          Message({
              message: error.message,
              type: 'error',
              duration: 5 * 1000
          })
          return Promise.reject(error)
      });

      return service;
    }
}

const requestService = new Request();
export default requestService;
