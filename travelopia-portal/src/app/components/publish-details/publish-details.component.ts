import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { TravelService } from 'src/app/Services/travel.service';
import {regex} from 'src/app/models/appdata'
@Component({
  selector: 'app-publish-details',
  templateUrl: './publish-details.component.html',
  styleUrls: ['./publish-details.component.scss']
})
export class PublishDetailsComponent implements OnInit {
  countries=[];
  travel={};
  emailRegex = regex.email;
  constructor(
    public travelService: TravelService,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getCountry()
  }

  getCountry() {
    this.travelService.getCountry().subscribe((response: any) => {
      if (response.success) {
        this.countries = response.data;
      } else {
        this.countries = []
      }
    })
  }

  addTraveller(addTravellerForm) {
    this.travelService.addTraveller(this.travel).subscribe((response: any) => {
      if (response.success) {
        this.commonService.showPnotify({
          text: response['message']});
        addTravellerForm.resetForm();
      } else {
        this.commonService.showPnotify({
          text: response['message']}); 
     }
    })  
  }
}
