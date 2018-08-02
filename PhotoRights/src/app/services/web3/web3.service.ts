import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WarningComponent } from '../../components/dialogs/warning/warning.component';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';

declare global {
  interface Window {
    web3: any;
  }
}

window.web3 = window.web3 || {};

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  public web3: any;
  public account = new BehaviorSubject<string>('');

  constructor(private dialog: MatDialog) {
    this.instantiate();
  }

  private instantiate() {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
      this.setEventListeners();
      this.setDefaultAccount();
    } else {
      this.dialog.open(WarningComponent, {
        data: 'No Web3 could be detected. Please install MetaMask and refresh the page.'
      });
    }
  }

  private setEventListeners() {
    this.web3.currentProvider.publicConfigStore.on('update', (data) => {
      console.log('Update: ' + JSON.stringify(data));
      this.setDefaultAccount();
    });
  }

  private setDefaultAccount() {
    this.web3.eth.getAccounts().then(accounts => {
      this.account.next(accounts[0]);
    });
  }
}
