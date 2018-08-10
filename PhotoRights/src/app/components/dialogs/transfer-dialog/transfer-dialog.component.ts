import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import RegistrationEvent from '../../../models/registrationEvent';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrls: ['./transfer-dialog.component.css']
})
export class TransferDialogComponent {

  public newAddress: string;

  constructor(public dialogRef: MatDialogRef<TransferDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: RegistrationEvent) { }

  public transfer() {
    this.dialogRef.close({event: this.data, newAddress: this.newAddress})
  }
}
