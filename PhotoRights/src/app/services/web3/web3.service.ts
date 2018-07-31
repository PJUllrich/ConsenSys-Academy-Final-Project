import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WarningComponent } from '../../components/dialogs/warning/warning.component';
import Web3 from 'web3';

declare global {
  interface Window { web3: any; }
}

window.web3 = window.web3 || {};

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  public web3: any;

  constructor(private dialog: MatDialog) {
    this.instantiate();
  }

  private instantiate() {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      this.dialog.open(WarningComponent, {
        data: 'No Web3 could be detected. Please install MetaMask and refresh the page.'
      })
    }
  }
}
