import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})



export class ContactServiceService {

  DATA_STORAGE = 'data';
  constructor() { }

  /**
   * Save contact into local storage 
   * get first data and iterate save to temporary variable and insert new data.
   * @param param 
   * @returns 
   */
  saveContact(param: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getData().then(data => {
        let tempContact = [];
        for (let i = 0; i < data.length; i++) {
          tempContact.push(data[i]);
        }
        tempContact.push(param);
        Storage.set({ key: this.DATA_STORAGE, value: JSON.stringify(tempContact) });
        resolve(tempContact);
      })
    });
  }



  /*
   * Removing contact from the local storage.
   * Remove first existing storage and set new data.
  */
  removeContact(index): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getData().then(data => {
        data.splice(index, 1);
        console.log(data);
        Storage.remove({ key: this.DATA_STORAGE })
        Storage.set({ key: this.DATA_STORAGE, value: JSON.stringify(data) });
        resolve(data);
      })
    })
  }

  /**
   * Retrieve data from local storage and convert to JSON
   * @returns local storage (this.DATA_STORAGE)
   */
  public async getData() {
    const cont = await Storage.get({ key: this.DATA_STORAGE });
    return JSON.parse(cont.value) || [];
  }




}
