import { Injectable } from '@angular/core';
import * as ABI from 'src/assets/PhotoRights.json';
import { Web3Service } from '../web3/web3.service';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private _contract: any;

  constructor(private web3Service: Web3Service, private accountService: AccountService) {
    this.web3Service.initialized.subscribe(initialized => { if (initialized) this.setContract() });
    this.accountService.accountObservable.subscribe((account) => this.setAccount(account));
  }
  public deploy() {
    this._contract
      .deploy({ data: ABI['bytecode'] as string, arguments: null })
      .send({ from: this._contract.options.from })
      .then(instance => this._contract.options.address = instance.options.address);
  }

  public connect(contractAddress) {
    this._contract.options.address = contractAddress;
  }

  private setContract() {
    this._contract = new this.web3Service.web3.eth.Contract(ABI['abi'], null, { from: this.accountService.account });
  }

  private setAccount(account) {
    this._contract.options.from = account;
  }

  get abi() {
    return ABI;
  }

  get contract() {
    return this._contract;
  }
}
