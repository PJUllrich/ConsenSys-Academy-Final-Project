import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WarningComponent } from '../../components/dialogs/warning/warning.component';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';
import { AppSettings } from '../../app.settings';

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

  private _web3: any;
  private _web3Events: any;
  public initialized = new BehaviorSubject(false);

  constructor(private dialog: MatDialog) {
    this.instantiate();
  }

  private instantiate() {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(window.web3.currentProvider);
      this._web3Events = new Web3(AppSettings.EVENTS_URL);
      this.initialized.next(true);
    } else {
      this.dialog.open(WarningComponent, {
        data: 'No Web3 could be detected. Please install MetaMask and refresh the page.'
      });
    }
  }

  get web3(): any {
    return this._web3;
  }

  get web3Events(): any {
    return this._web3Events;
  }
}
