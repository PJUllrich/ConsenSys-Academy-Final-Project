import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import RegistrationEvent from '../../models/registrationEvent';
import { Subscription } from 'rxjs';
import { ContractService } from '../../services/contract/contract.service';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {

  private _events: RegistrationEvent[] = [];
  private _eventSubscription: Subscription;
  public dataSource = new MatTableDataSource<RegistrationEvent>();
  public displayedColumns = ['index', 'hash'];

  constructor(private contractService: ContractService, private accountService: AccountService) { }

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
}
