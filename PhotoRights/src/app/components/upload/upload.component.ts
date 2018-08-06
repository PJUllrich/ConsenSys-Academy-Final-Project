import { Component, ViewChild } from '@angular/core';
import { FileLoaderComponent } from '../file-loader/file-loader.component';
import { ContractService } from '../../services/contract/contract.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent extends FileLoaderComponent {

  @ViewChild('form') form;
  protected fingerprint: string;

  constructor(public contractService: ContractService) { super(); }

  public register() {
    this.contractService.register(this.fingerprint);
  }

  public check() {
    this.contractService.check(this.fingerprint);
  }

  public transfer(toAddress: string) {
    // this.contractService.transfer(this.fingerprint, toAddress);
  }

  public clear() {
    this.fingerprint = null;
    this.form.nativeElement.reset();
  }

  public allSet(): boolean {
    return this.contractService.contract.options.address != null && this.fingerprint != null;
  }

}
