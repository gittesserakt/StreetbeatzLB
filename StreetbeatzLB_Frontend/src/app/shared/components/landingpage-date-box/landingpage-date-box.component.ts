import {Component, Input, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-landingpage-date-box',
  templateUrl: './landingpage-date-box.component.html',
  styleUrls: ['./landingpage-date-box.component.scss']
})
export class LandingpageDateBoxComponent implements OnInit {
  startDate: Date = new Date(2023,4,26);
  endDate: Date = new Date(2023,4,28);
  startDay: string;
  endDay: string;
  month: string;
  year: string;

  leftButton: string = "Map";
  rightButton: string = "Performances";

  @Input() screenHeightPX?:number;
  @Input() screenWidthPX!:number;

  constructor(private router: Router, private authService: AuthService) {
    this.startDay = this.startDate.getDate().toString();
    this.endDay = this.endDate.getDate().toString();
    this.month = this.getStringMonth(this.endDate);
    this.year = this.startDate.getFullYear().toString();
  }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // Benutzer ist als Admin eingeloggt
        this.rightButton = 'Admin';
      } else {
        // Benutzer ist nicht als Admin eingeloggt
        this.rightButton = 'Performances';
      }
    });
  }

  getStringMonth(date: Date): string {
    let day = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return  day[date.getMonth()];
  }

  leftButtonClick(){
    this.router.navigate(['/map']);
  }
  rightButtonClick(){
    if (this.rightButton === 'Admin') {
      this.router.navigate(['/admin-view']);
    } else {
      this.router.navigate(['/performances']);
    }
  }
}
