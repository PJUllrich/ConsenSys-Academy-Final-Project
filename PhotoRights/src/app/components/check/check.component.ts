import { Component } from '@angular/core';
import { FileLoaderComponent } from '../file-loader/file-loader.component';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent extends FileLoaderComponent{

  protected fingerprint: [number];

  constructor() {super(); }

}
