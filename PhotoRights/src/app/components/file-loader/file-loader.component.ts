import { ImageService } from '../../services/image/image.service';
import { HashService } from '../../services/hash/hash.service';

export abstract class FileLoaderComponent {

  protected abstract fingerprint: string;

  protected constructor() { }

  public load(event) {
    ImageService.getFile(event.target.files[0])
      .then(file => {
        this.fingerprint = HashService.toHex(file);
        console.log(file);
        console.log(this.fingerprint);
      })
      .catch(error => console.error(error));
  }

  public toBytes(): number[] {
    return this.fingerprint ? HashService.toBytes(this.fingerprint) : [0];
  }
}
