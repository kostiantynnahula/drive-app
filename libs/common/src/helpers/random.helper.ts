import { randomBytes } from 'crypto';

export const randomString = (length = 32): string => {
  if (length % 2 !== 0) {
    length++;
  }
  return randomBytes(length / 2).toString('hex');
};
