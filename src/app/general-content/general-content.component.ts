import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/global';

@Component({
  selector: 'app-general-content',
  templateUrl: './general-content.component.html',
  styleUrls: ['./general-content.component.scss']
})
export class GeneralContentComponent implements OnInit {
  dispalyContent = 'welcomepage';
  entryPerson = 'staff'
  constructor(private route: Router, public global: GlobalService) { }

  ngOnInit() {
  }
  goToRegistration() {
    this.route.navigate(['/preregistration'])
  }
}
