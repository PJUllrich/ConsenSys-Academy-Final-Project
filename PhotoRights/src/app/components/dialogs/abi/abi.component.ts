import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../../services/contract/contract.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-abi',
  templateUrl: './abi.component.html',
  styleUrls: ['./abi.component.css']
})
export class AbiComponent implements OnInit {

  constructor(public contractService: ContractService, public dialogRef: MatDialogRef<AbiComponent>) { }

  ngOnInit() {
  }

}
