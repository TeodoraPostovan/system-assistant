import * as crypto from 'crypto';

export function randomId() {
  return crypto.randomBytes(8).toString('hex');
}
