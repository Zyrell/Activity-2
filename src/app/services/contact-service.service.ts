import { Injectable } from '@angular/core';
import {Plugins} from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})

export class ContactServiceService {
  contactListRef: AngularFireList<any>;
  contactRef: AngularFireObject<any>;
  aptService: any;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createContact(cont: Contact) {
    return this.contactListRef.push({
      name: cont.name + " " + cont.familyname,
      number: cont.number
    })
  }

  // Get Single
  getContact(id: string) {
    this.contactRef = this.db.object('/contact/' + id);
    return this.contactRef;
  }

  // Get List
  getContactList() {
    this.contactListRef = this.db.list('/contact');
    return this.contactListRef;
  }

  // Delete
  deleteContact(id: string) {
    this.contactRef = this.db.object('/contact/' + id);
    this.contactRef.remove();
  }
}