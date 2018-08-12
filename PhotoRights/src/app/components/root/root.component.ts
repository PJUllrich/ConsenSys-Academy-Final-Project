import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit() {
  }

}
