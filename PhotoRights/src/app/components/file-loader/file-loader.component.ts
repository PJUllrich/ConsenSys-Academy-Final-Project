import { ImageService } from '../../services/image/image.service';
import { HashService } from '../../services/hash/hash.service';
import { Component } from '@angular/core';

@Component({
  template: ''
})
export abstract class FileLoaderComponent {
  protected abstract fingerprint: [number];

  protected constructor() { }

  public load(event) {
    ImageService.getFile(event)
      .then(file => this.fingerprint = HashService.sha256(file))
      .catch(error => console.error(error));
  }

  public toHex(): string {
    return this.fingerprint ? HashService.toHex(this.fingerprint) : '';
  }
}
