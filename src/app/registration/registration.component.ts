import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(public global: GlobalService, private route: Router) { }
  registrationDetials = {
    fullName: '',
    idNumber: '',
    dateOfBirth: '',
    employer: '',
    nameOfTwrpContract: '',
    expiryDateConstruction: '',
    expiryDateWork: '',
    nationality: '',
  }
  thankYouPage = false;
  ngOnInit() {
  }
  saveRegistration() {
    this.thankYouPage = true;
  }
  reset() {
    this.registrationDetials = {
      fullName: '',
      idNumber: '',
      dateOfBirth: '',
      employer: '',
      nameOfTwrpContract: '',
      expiryDateConstruction: '',
      expiryDateWork: '',
      nationality: '',
    }
  }

}
