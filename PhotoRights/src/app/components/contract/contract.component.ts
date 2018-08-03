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

  public contractAddress: string;

  constructor(public contractService: ContractService, private matDialog: MatDialog) { }

  ngOnInit() {
  }

  public showABI() : void {
    this.matDialog.open(AbiComponent, null);
  }

  public deploy() : void {
    this.contractService.deploy();
  }

  public connect() : void {
    this.contractService.connect(this.contractAddress);
  }
}
