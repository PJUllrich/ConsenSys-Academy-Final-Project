import { Component } from '@angular/core';
import { FileLoaderComponent } from '../file-loader/file-loader.component';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent extends FileLoaderComponent {

  protected fingerprint: [number];

  constructor() {super(); }

}
