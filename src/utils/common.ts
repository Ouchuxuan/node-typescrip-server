import crypto from 'crypto'
import config from '../config';
import stream from 'stream';

/**
 * @description 加密密码
 */
export const encrypt = (password: string): string => {
  const hmac = crypto.createHmac('sha256', config.secretKey);
  hmac.update(password);
  return hmac.digest('hex');
}

export const checkPasswordHash = (databasePassword: string, password: string): boolean => {
  // console.log(databasePassword, encrypt(password))
  return encrypt(password) === databasePassword;
}

export const streamToBuffer = (stream: stream):Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const buffers = [];
    stream.on('error', reject);
    stream.on('data', data=>buffers.push(data));
    stream.on('end', ()=>resolve(Buffer.concat(buffers)))
  })
}