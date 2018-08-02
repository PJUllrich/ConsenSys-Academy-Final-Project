import { Injectable } from '@angular/core';
import * as Cryptocompare from 'cryptocompare';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor() { }

  public static getPrice(symbol: string, currency: string): Promise<string> {
    return Cryptocompare.price(symbol, currency);
  }
}
