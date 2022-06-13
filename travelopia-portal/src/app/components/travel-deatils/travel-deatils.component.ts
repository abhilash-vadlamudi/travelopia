import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { TravelService } from 'src/app/Services/travel.service';

@Component({
  selector: 'app-travel-deatils',
  templateUrl: './travel-deatils.component.html',
  styleUrls: ['./travel-deatils.component.scss']
})
export class TravelDeatilsComponent implements OnInit {
  travelInfo:any = [];
  constructor(
    public travelService: TravelService,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getTravelDetails()
  }

  getTravelDetails() {
    this.travelService.getTravelDetails().subscribe((response: any) => {
      if (response.success) {
        this.travelInfo = response.data;
        console.log(this.travelInfo)
      } else {
        this.travelInfo = []
      }
    })
  }
}
