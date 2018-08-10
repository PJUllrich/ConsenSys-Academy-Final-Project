import { Component, ViewChild } from '@angular/core';
import { FileLoaderComponent } from '../file-loader/file-loader.component';
import { ContractService } from '../../services/contract/contract.service';
import { MatDialog } from '@angular/material';
import { ResultDialogComponent } from '../dialogs/result-dialog/result-dialog.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent extends FileLoaderComponent {

  @ViewChild('form') form;
  protected fingerprint: string;

  constructor(public contractService: ContractService, private dialog: MatDialog) { super(); }

  public register() {
    this.contractService
      .register(this.fingerprint)
      .then(
        _ => this.openDialog(true, 'Image registered successfully'),
        _ => this.openDialog(false, 'An error occurred while registering image.')
      );
  }

  public check() {
    this.contractService
      .check(this.fingerprint)
      .then(
        result => {
          if (result[0]) {
            this.openDialog(true, 'Image is registered at Index: ' + result[1]);
          } else {
            this.openDialog(false, 'Image not registered');
          }
        },
        _ => this.openDialog(false, 'An error occurred while checking registration.')
      );
  }

  public transfer(toAddress: string) {
    // this.contractService.transfer(this.fingerprint, toAddress);
  }

  public clear() {
    this.fingerprint = null;
    this.form.nativeElement.reset();
  }

  public allSet(): boolean {
    return this.contractService.contract.options.address != null && this.fingerprint != null;
  }

  private openDialog(success: boolean, message: string) {
    this.dialog.open(ResultDialogComponent, {data: {success: success, message: message}});
  }
}
