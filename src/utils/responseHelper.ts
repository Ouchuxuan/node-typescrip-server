const RES_CODE_MAP = {
  SUCCESS: {
    message: '请求成功',
    code: 200
  },
  CUSTOMERROR: {
    message: '自定义错误',
    code: 100
  },
  NOLOGIN: {
    message: '用户未登陆',
    code: 100
  },
  USERNOTEXIST: {
    message: '用户不存在',
    code: 100
  },
  TOKENEXPIRED: {
    message: 'token 过期',
    code: 100
  },
  PASSWORDERROR: {
    message: '密码错误',
    code: 100
  },
  VERTIFYERROR: {
    message: '验证码错误',
    code: 100
  },
  REQUESTERROR: {
    message: '请求参数/格式错误',
    code: 100
  },
  NOAUTH: {
    message: '没有权限',
    code: 100
  },
  NOTEXIST: {
    message: '资源不存在',
    code: 100
  },
  SERVICEERROR: {
    message: '服务器异常',
    code: 100
  },

}

type codeMap = keyof typeof JsonHelper.RESCODE

export default class JsonHelper {
  static RESCODE = RES_CODE_MAP
  static response(code: codeMap = "SUCCESS", data: any = null) {
    return {
      code: JsonHelper.RESCODE[code].code,
      message: JsonHelper.RESCODE[code].message,
      data,
    }
  }
  static custom(message = '') {
    return {
      code: JsonHelper.RESCODE['CUSTOMERROR'].code,
      message,
    }
  }
}