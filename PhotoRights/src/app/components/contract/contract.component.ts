import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract/contract.service';
import { MatDialog } from '@angular/material';
import { AbiComponent } from '../dialogs/abi/abi.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  constructor(public contractService: ContractService, private matDialog: MatDialog) { }

  ngOnInit() {
  }

  public showABI() : void {
    this.matDialog.open(AbiComponent, null);
  }
}
