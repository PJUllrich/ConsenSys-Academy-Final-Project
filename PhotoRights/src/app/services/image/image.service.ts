import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public static getFile(event): Promise<Blob> {
    return new Promise(((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException('Error occurred while parsing input file.'));
      };

      reader.readAsArrayBuffer(event.target.files[0]);
    }));
  }
}
