import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landingpage-date-box',
  templateUrl: './landingpage-date-box.component.html',
  styleUrls: ['./landingpage-date-box.component.scss']
})
export class LandingpageDateBoxComponent {
  startDate: Date = new Date(2023,4,26);
  endDate: Date = new Date(2023,4,28);
  startDay: string;
  endDay: string;
  month: string;
  year: string;

  leftButton:string = "Map";
  rightButton:string = "Performances"

  @Input() screenHeightPX?:number;
  @Input() screenWidthPX!:number;

  constructor(private router: Router) {
    this.startDay = this.startDate.getDate().toString();
    this.endDay = this.endDate.getDate().toString();
    this.month = this.getStringMonth(this.endDate);
    this.year = this.startDate.getFullYear().toString();
  }

  getStringMonth(date: Date): string {
    let day = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Julie", "August", "September", "Oktober", "November", "Dezember"];
    return  day[date.getMonth()];
  }

  leftButtonClick(){
    this.router.navigate(['/map']);
  }
  rightButtonClick(){
    this.router.navigate(['/performances']);
  }
}
