import {Component, Inject} from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";

@Component({
  selector: 'app-landingpage-sponsor',
  templateUrl: './landingpage-sponsor.component.html',
  styleUrls: ['./landingpage-sponsor.component.scss']
})
export class LandingpageSponsorComponent {
  height: number = 667; //nope
  spadaBankLogo: string;
  bluebaLogo: string;
  RZLogo: string;
  EnergyLogo: string;
  RothausLogo: string;
  LautmacherLogo: string;
  GoControlLogo: string;
  KreiszeitungLogo: string;

  constructor(@Inject(APP_BASE_HREF) public baseHref: string) {
    this.spadaBankLogo = baseHref + "assets/companyLogo/sponsors/Sparda_Bank_logo.png";
    this.bluebaLogo = baseHref + "assets/companyLogo/sponsors/blueba_logo.png";
    this.RZLogo = baseHref + "assets/companyLogo/sponsors/RZ_logo.png";
    this.EnergyLogo = baseHref + "assets/companyLogo/sponsors/Energy_Logo.png";
    this.RothausLogo = baseHref + "assets/companyLogo/sponsors/rothaus_logo.png";
    this.LautmacherLogo = baseHref + "assets/companyLogo/sponsors/Lautmacher_Logo.png";
    this.GoControlLogo = baseHref + "assets/companyLogo/sponsors/Go_Control_Logo.png";
    this.KreiszeitungLogo = baseHref + "assets/companyLogo/sponsors/kreiszeitung_logo.png";
  }
}
