import { Component } from '@angular/core';
import { FileLoaderComponent } from '../file-loader/file-loader.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends FileLoaderComponent {

  protected fingerprint: [number];

  constructor() { super(); }

}
