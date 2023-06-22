import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landingpage-button',
  templateUrl: './landingpage-button.component.html',
  styleUrls: ['./landingpage-button.component.scss']
})
export class LandingpageButtonComponent {
  url: string = "https://ticketshop.blueba.de/";

  constructor(private router: Router) {
  }

  performanceButtonClick() {
    this.router.navigate(['/performances']);
  }

  voteButtonClick() {
    this.router.navigate(['/vote']);
  }

  mapButtonClick() {
    this.router.navigate(['/map']);
  }

  ticketButtonClick() {
    window.open(this.url, '_blank');
  }
}
