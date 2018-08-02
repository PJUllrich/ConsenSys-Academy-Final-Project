import { Component } from '@angular/core';
import { FileLoaderComponent } from '../file-loader/file-loader.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent extends FileLoaderComponent {

  protected fingerprint: [number];

  constructor() {super(); }

}
