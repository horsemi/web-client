// login.Data 参数类型
export interface LoginData {
  accoount: string,
  password: string,
  pageName?: string
}

// VUEX login.State 参数类型
export interface LoginState {
  // author?: any
  loginUser: string,
  loginName: string  
}

// GET_DATA_ASYN 接口参数类型
// export interface DataOptions {}

