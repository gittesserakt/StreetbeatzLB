import { Component } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent {
  /*isAuthenticated$ = this.authService.isAuthenticated$;*/
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private authService: AuthService){
    iconRegistry.addSvgIcon('streetbeatz', sanitizer.bypassSecurityTrustResourceUrl('./assets/streetbeatzLogo/logo.svg'));
  }
}
