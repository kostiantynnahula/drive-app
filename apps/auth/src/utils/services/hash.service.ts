import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  private salt = 10;

  constructor() {
    this.salt = Number(process.env.PASSWORD_SALT) || 10;
  }

  /**
   * Transform string value to hash string
   *
   * @param {string} value
   * @returns {Promise<string>}
   */
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }

  /**
   * Compare hashed value with string value
   *
   * @param {string} value
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
