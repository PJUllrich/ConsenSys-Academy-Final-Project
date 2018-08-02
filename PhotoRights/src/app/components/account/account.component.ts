import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Web3Service } from '../../services/web3/web3.service';
import { PriceService } from '../../services/price/price.service';
import { AppSettings } from '../../app.settings';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public balanceCrypto: number;
  public balanceFiat: number;
  public appSettings = AppSettings;

  constructor(public web3Service: Web3Service, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.web3Service.account.subscribe((account) => {
      if (account === '') return;

      this.getDefaultBalance()
        .then(() => this.getFiatBalance()
          .then(() => this.cdr.detectChanges()));
    });
  }

  public getDefaultBalance() {
    return this.web3Service.web3.eth.getBalance(this.web3Service.account.getValue())
      .then(balance => this.balanceCrypto = this.web3Service.web3.utils.fromWei(balance, 'ether'));
  }

  public getFiatBalance() {
    return PriceService.getPrice(AppSettings.SYMBOL_CRYPTO, AppSettings.SYMBOL_FIAT)
      .then(priceJSON => this.balanceFiat = this.balanceCrypto * priceJSON[AppSettings.SYMBOL_FIAT]);
  }
}
