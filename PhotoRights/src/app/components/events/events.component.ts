import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ContractService } from '../../services/contract/contract.service';
import BaseEvent from '../../models/baseEvent';
import { EventDialogComponent } from '../dialogs/event-dialog/event-dialog.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  private _events: BaseEvent[] = [];
  private _eventSubscription: Subscription;
  public dataSource = new MatTableDataSource<BaseEvent>();
  public displayedColumns = ['blockNumber', 'name', 'returnValues'];

  constructor(private contractService: ContractService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this._eventSubscription = this.contractService.events.subscribe(
      (event: BaseEvent) => {
        this._events.push(event);
        this.dataSource = new MatTableDataSource(this._events);
      }
    );
  }

  public showInformation(event) {
    this.dialog.open(EventDialogComponent, {data: event});
  }
}
