import { Injectable } from '@angular/core';
import * as SJCL from 'sjcl';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor() { }

  public static sha256(data: string) : [number] {
    return SJCL.hash.sha256.hash(data);
  }

  public static toHex(data: [number]) : string {
    return SJCL.codec.hex.fromBits(data);
  }
}
