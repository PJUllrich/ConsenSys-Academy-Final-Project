import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import RegistrationEvent from '../../models/registrationEvent';
import { Subscription } from 'rxjs';
import { ContractService } from '../../services/contract/contract.service';
import { AccountService } from '../../services/account/account.service';
import { ResultDialogComponent } from '../dialogs/result-dialog/result-dialog.component';
import { TransferDialogComponent } from '../dialogs/transfer-dialog/transfer-dialog.component';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {

  private _events: RegistrationEvent[] = [];
  private _eventSubscription: Subscription;
  public dataSource = new MatTableDataSource<RegistrationEvent>();
  public displayedColumns = ['index', 'hash', 'actions'];

  constructor(private contractService: ContractService, private accountService: AccountService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this._eventSubscription = this.contractService.events.subscribe(
      (event: RegistrationEvent) => {
        if (event.event === 'Registration' && event.returnValues.adder.toUpperCase() === this.accountService.account) {
          this._events.push(event);
          this.dataSource = new MatTableDataSource(this._events);
        }
      }
    );
  }

  public transfer(element: RegistrationEvent) {
    const dialogRef = this.dialog.open(TransferDialogComponent, {data: element})
    dialogRef.afterClosed().subscribe(
      result => this.contractService.transfer(result.event.returnValues.index, result.newAddress)
        .then(
          _ => this.dialog.open(ResultDialogComponent, {data: {success: true, message: 'Image transferred successfully to ' + result.newAddress }}),
        _ => this.dialog.open(ResultDialogComponent, {data: {success: false, message: 'An error occurred while transferring the image'}})
        )
    )
  }

  public remove(element: RegistrationEvent) {
    this.contractService
      .remove(element.returnValues.index)
      .then(
        _ => this.dialog.open(ResultDialogComponent, {data: {success: true, message: 'Image registration removed successfully'}}),
        _ => this.dialog.open(ResultDialogComponent, {data: {success: false, message: 'An error occurred while removing the image'}})
      );
  }
}
