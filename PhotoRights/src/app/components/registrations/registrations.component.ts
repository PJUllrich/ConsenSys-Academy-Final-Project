import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ContractService } from '../../services/contract/contract.service';
import { AccountService } from '../../services/account/account.service';
import { ResultDialogComponent } from '../dialogs/result-dialog/result-dialog.component';
import { TransferDialogComponent } from '../dialogs/transfer-dialog/transfer-dialog.component';
import Hash from '../../models/hash';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {

  private _registrations: Hash[] = [];
  public dataSource = new MatTableDataSource<Hash>();
  public displayedColumns = ['index', 'hash', 'actions'];

  constructor(private contractService: ContractService, private accountService: AccountService, private dialog: MatDialog, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.contractService.events.subscribe(_ => this.getRegistrations());
    this.accountService.accountObservable.subscribe(_ => this.getRegistrations());
  }

  public transfer(element: Hash) {
    const dialogRef = this.dialog.open(TransferDialogComponent, {data: element});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result != null) this.contractService.transfer(result.element.index, result.newAddress)
          .then(
            _ => {
              this.dialog.open(ResultDialogComponent, {
                data: {
                  success: true,
                  message: 'Image transferred successfully to ' + result.newAddress
                }
              });
              this.getRegistrations();
            },
            error => {
              console.error(error);
              this.dialog.open(ResultDialogComponent, {
                data: {
                  success: false,
                  message: 'An error occurred while transferring the image'
                }
              });
            });
      }
    );
  }

  public remove(element: Hash) {
    this.contractService
      .remove(element.index)
      .then(
        _ => {
          this.dialog.open(ResultDialogComponent, {
            data: {
              success: true,
              message: 'Image registration removed successfully'
            }
          });
          this.getRegistrations();
        },
            error => {
              console.log(error);
              this.dialog.open(ResultDialogComponent, {
                data: {
                  success: false,
                  message: 'An error occurred while removing the image'
                }
              });
            }
      );
  }

  public getRegistrations() {
    if (this.contractService.contract.options.address == null) return;
    if (this.accountService.account == null) return;

    this.contractService.contract.methods.getRegistrationCount().call().then(result => {
      this._registrations = [];
      this.dataSource = new MatTableDataSource<Hash>(this._registrations);

      for (let idx = 0; idx < result; idx++) {
        this.contractService.contract.methods
          .registry(idx)
          .call()
          .then(hash => {
            if (hash != null && hash.owner.toUpperCase() === this.accountService.account && !this.hashKnown(hash)) {
              this._registrations.push(new Hash(idx, hash.fingerprint, hash.owner, hash.timestamp));
              this.dataSource = new MatTableDataSource<Hash>(this._registrations);
            }
            this.ref.detectChanges();
          });
      }
    });
  }
  ;

  private hashKnown(hash: Hash): boolean {
    for (let registration of this._registrations)
      if (registration.fingerprint.toUpperCase() === hash.fingerprint.toUpperCase()) return true;

    return false;
  }
}
