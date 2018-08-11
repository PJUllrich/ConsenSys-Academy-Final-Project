import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Hash from '../../../models/hash';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrls: ['./transfer-dialog.component.css']
})
export class TransferDialogComponent {

  public newAddress: string;

  constructor(public dialogRef: MatDialogRef<TransferDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Hash) { }

  public transfer() {
    this.dialogRef.close({element: this.data, newAddress: this.newAddress})
  }

  public setAddress(address: string) {
    this.newAddress = address;
    console.log(!this.newAddress);
  }

  public reset() {
    this.newAddress = null;
  }
}
