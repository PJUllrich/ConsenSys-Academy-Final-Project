import { Injectable } from '@angular/core';
import * as ABI from 'src/assets/PhotoRights.json';
import { Web3Service } from '../web3/web3.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private _contract: any;

  constructor(private web3Service: Web3Service) {
    web3Service.initialized.subscribe((initialized) => { if (initialized) this.setContract() })
  }

  get abi() {
    return ABI;
  }

  private setContract() {
    this._contract = new this.web3Service.web3.eth.Contract(ABI['abi']);
  }
}
