import { Injectable } from '@angular/core';
import { PriceService } from '../price/price.service';
import { AppSettings } from '../../app.settings';
import { Web3Service } from '../web3/web3.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _balanceCrypto: number = 0;
  private _balanceFiat: number = 0;
  private _account: string;

  public isAdmin: boolean = false;
  public accountObservable = new BehaviorSubject<string>(null);

  constructor(private web3Service: Web3Service) {
    this.web3Service.initialized.subscribe(initialized => { if (initialized) this.initialize(); });
  }

  private initialize() {
    this.setEventListeners();
    this.getCoinbase();
  }

  private setEventListeners() {
    this.web3Service.web3.currentProvider.publicConfigStore.on('update', () => this.getCoinbase());
  }

  private getCoinbase() {
    this.web3Service.web3.eth.getCoinbase().then(coinbase => this.update(coinbase));
  }

  private update(account: string) {
    this._account = account.toUpperCase();
    this.getDefaultBalance()
      .then(() => this.getFiatBalance())
      .then(() => this.accountObservable.next(this._account));
  }

  private getDefaultBalance() {
    return this.web3Service.web3.eth.getBalance(this._account)
      .then(balance => this._balanceCrypto = this.web3Service.web3.utils.fromWei(balance, 'ether'));
  }

  private getFiatBalance() {
    return PriceService.getPrice(AppSettings.SYMBOL_CRYPTO, AppSettings.SYMBOL_FIAT)
      .then(priceJSON => this._balanceFiat = this._balanceCrypto * priceJSON[AppSettings.SYMBOL_FIAT]);
  }

  get account() {
    return this._account;
  }

  get balanceCrypto(): number {
    return this._balanceCrypto;
  }

  get balanceFiat(): number {
    return this._balanceFiat;
  }
}
