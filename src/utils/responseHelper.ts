import responseCode from './responseCode';

type resCode = keyof typeof responseCode

export const responseHelper = (code: resCode = 200, data: unknown = null) => {
  return {
    code,
    data,
    message: responseCode[code]
  }
}