import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public appSettings = AppSettings;

  constructor(public accountService: AccountService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.accountService.accountObservable.subscribe(() => this.cdr.detectChanges());
  }
}
