import { Component, OnInit} from '@angular/core';
import { AlertController, NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ContactServiceService } from '../services/contact-service.service';
import {MessagePageModule} from '../message/message.module';
import { Contact } from '../services/contact';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  contactForm: FormGroup;
  contacts: any = [];

  constructor(
    private alertCtrl:AlertController,
    private contService: ContactServiceService,
    private router: Router,
    public fb: FormBuilder

  ) {}

  ngOnInit(){

    this.fetchContact();
    let contact = this.contService.getContactList();
    contact.snapshotChanges().subscribe(res => {
      this.contacts = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.contacts.push(a as Contact);
      }) 
    })
  }

  fetchContact() {
    this.contService.getContactList().valueChanges().subscribe(res => {
      console.log(res)
    })

    this.contactForm = this.fb.group({
      name: [''],
      familyname: [''],
      number: ['']
    })
}

  formSubmit() {
    if (!this.contactForm.valid) {
      return false;
    } else {
      this.contService.createContact(this.contactForm.value).then(res => {
        console.log(res)
        this.contactForm.reset();
      })
        .catch(error => console.log(error));
    }
  }
  deleteContact(id) {
    console.log(id)
    if (window.confirm('Are you sure you want to delete this contact?')) {
      this.contService.deleteContact(id)
    }
  }

  }