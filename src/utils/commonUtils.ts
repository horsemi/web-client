/*
 * @Description: 公共函数
 * @Author: asheng
 * @Date: 2018-12-07 11:36:27
 * @LastEditors: asheng
 * @LastEditTime: 2018-12-12 15:22:04
 */

import Cookies from 'js-cookie'
import { cookieExpires } from '@/config' // cookie保存的天数
import moment from 'moment';

interface ICommomUtil {
    TOKEN_KEY: string;
    setToken(token: string): void;
    getToken(): boolean | string;
    getParams(url: string): any;
    hasKey(obj: any, key: string | number): number | boolean;
    formatDate(datetime: string | Date): string;
    verifyPhone(phone: number | string): any;
}

class CommonUtil implements ICommomUtil {
  
  TOKEN_KEY: string = 'token'
  /**
   * @author: asheng
   * @description: 存取token
   * @param {string} token
   */
  setToken(token: string): void {
    Cookies.set(this.TOKEN_KEY, token, { expires: cookieExpires || 1 })
  }
  /**
   * @author: asheng
   * @description: 获取token
   */
  getToken(): boolean | string {
    const token = Cookies.get(this.TOKEN_KEY)
    if (token) {
      return token
    } else {
      return false
    }
  }

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
getParams(url: string): any {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj: any = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
hasKey(obj: any, key: string | number): number | boolean {
  if (key) {
    return key in obj
  } else {
    const keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @description 日期格式换
 * @author F2
 * @param {String | Date} datetime
 * @param {String} expression
 * @returns {String}
 */
formatDate(datetime: string | Date, expression: string = 'l'): string {
    const m = moment(datetime);
    switch (expression) {
        case 's':
            return m.format('YYYY-MM-DD');
        case 'S':
            return m.format('YYYY年MM月DD日');
        case 'l':
            return m.format('YYYY-MM-DD HH:mm:ss');
        case 'L':
            return m.format('YYYY年MM月DD日 HH:mm:ss');
    }
    return datetime.toString();
}
// copy in the 'fx-fuli' utils
/**
 * @description 校验手机号是否正确
 * @author F2
 * @param {string | number} phone
 * @returns {any}
 */
verifyPhone(phone: string | number): any {
  const reg = /^1[34578][0-9]{9}$/
  const _phone = phone.toString().trim()
  let toastStr = _phone === '' ? '手机号不能为空~' : !reg.test(_phone) && '请输入正确手机号~'
  return {
    errMsg: toastStr,
    done: !toastStr,
    value: _phone
  }
}

/**
 * @description 验证字符串是否为空
 * @author F2
 * @param {string | number} str
 * @param {string} text
 * @returns {any}
 */
verifyStr(str: string | number, text: string): any {
  const _str = str.toString().trim()
  const toastStr = _str.length ? false : `请填写${text}～`
  return {
    errMsg: toastStr,
    done: !toastStr,
    value: _str
  }
}

// 截取字符串
sliceStr(str: any, sliceLen: number): any {
  if (!str) { return '' }
  let realLength = 0
  const len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
    if (realLength > sliceLen) {
      return `${str.slice(0, i)}...`
    }
  }

  return str
}


/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 */
objClone(jsonObj: any): object | string {
  let buf: any
  if (jsonObj instanceof Array) {
    buf = []
    let i = jsonObj.length
    while (i--) {
      buf[i] = this.objClone(jsonObj[i])
    }
    return buf
  } else if (jsonObj instanceof Object) {
    buf = {}
    for (let k in jsonObj) {
      buf[k] = this.objClone(jsonObj[k])
    }
    return buf
    } else {
      return jsonObj
    }
  }
}
const commonUtil = new CommonUtil();

export {
  commonUtil,
  ICommomUtil
}

