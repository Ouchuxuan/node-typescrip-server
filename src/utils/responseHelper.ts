import responseCode from './responseCode';


export const RESCODE = {
  SUCCESS: "请求成功",
  CUSTOMERROR: "自定义错误",
  NOLOGIN: '用户未登陆',
  USERNOTEXIST: '用户不存在',
  TOKENEXPIRED: 'token 过期',
  PASSWORDERROR: '密码错误',
  VERTIFYERROR: '验证码错误',
  REQUESTERROR: "请求参数/格式错误",
  NOAUTH: "没有权限",
  NOTEXIST: "资源不存在",
  SERVICEERROR: "服务器异常",
}


export const responseHelper = (code: string = "SUCCESS", data: unknown = null) => {
  return {
    code,
    data,
    message: responseCode[code]
  }
}