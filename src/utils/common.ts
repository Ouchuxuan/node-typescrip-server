import crypto from 'crypto'
import config from '../config';

/**
 * @abstract 加密密码
 */
export const encrypt = (password: string): string => {
  const hmac = crypto.createHmac('sha256', config.secretKey);
  hmac.update(password);
  return hmac.digest('hex');
}

export const checkPasswordHash = (databasePassword:string, password:string) => {
  console.log('password', password)
  console.log(databasePassword, encrypt(password))
  return encrypt(password) === databasePassword;
}