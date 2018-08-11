import { Injectable } from '@angular/core';
import * as ABI from 'src/assets/PhotoRights.json';
import { Web3Service } from '../web3/web3.service';
import { AccountService } from '../account/account.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private _contract: any;
  private _contractEvents: any;
  public events = new ReplaySubject();

  constructor(private web3Service: Web3Service, private accountService: AccountService) {
    this.web3Service.initialized.subscribe(initialized => { if (initialized) this.setContract(); });
  }

  public deploy() {
    this._contract.options.from = this.accountService.account;
    this._contract
      .deploy({data: ABI['bytecode'] as string, arguments: null})
      .send({from: this._contract.options.from})
      .then(instance => {
        this.setContract(instance.options.address);
        this.startEventListening();
      });
  }

  public connect(contractAddress: string) {
    this.setContract(contractAddress);
    this.startEventListening();
  }

  public register(fingerprint: string): Promise<any> {
    return this._contract.methods.register(fingerprint)
      .send(this.payload)
  }
  public check(fingerprint: string): Promise<any> {
    return this._contract.methods.checkRegistration(fingerprint)
      .call(this.payload)
  }

  public remove(index: number): Promise<any> {
    return this._contract.methods.remove(index)
      .send(this.payload)
  }

  public transfer(index: number, toAddress: string) {
    return this._contract.methods.transfer(index, toAddress)
      .send(this.payload)
  }

  private setContract(address: string = null) {
    this._contract = new this.web3Service.web3.eth.Contract(ABI['abi'], address, {from: this.accountService.account});
    this._contractEvents = new this.web3Service.web3Events.eth.Contract(ABI['abi'], address);
  }

  private startEventListening() {
    this._contractEvents.events.allEvents({fromBlock: 0}, (error, event) => {
      if (error != null) console.error(error);
      if (event != null) this.events.next(event);
    })
  }

  get abi() {
    return ABI;
  }

  get contract() {
    return this._contract;
  }

  get payload() {
    return {from: this.accountService.account}
  }
}
