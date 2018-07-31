import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../services/web3/web3.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public web3Service: Web3Service) { }

  ngOnInit() {
  }

}
