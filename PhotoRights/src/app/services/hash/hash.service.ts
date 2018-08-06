import { Injectable } from '@angular/core';
import * as shajs from 'sha.js';
import { AppSettings } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor() { }

  public static toHex(data: Blob): string {
    return shajs(AppSettings.HASH_ALGORITHM)
      .update(data)
      .digest('hex')
  }

  public static toBytes(data: string): number[] {
    return this.toUTF8(data).split('').map(c => c.charCodeAt(0));
  }

  private static toUTF8(data: string): string {
    return unescape(encodeURIComponent(data));
  }
}
