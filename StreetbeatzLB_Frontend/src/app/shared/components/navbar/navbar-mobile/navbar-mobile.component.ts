import {Component, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss']
})
export class NavbarMobileComponent implements OnInit {
  @Input() navbarHeight: number = 64;
  isAuthenticated$ = this.authService.isAuthenticated$;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private authService: AuthService) {
    iconRegistry.addSvgIcon('streetbeatz', sanitizer.bypassSecurityTrustResourceUrl('./assets/streetbeatzLogo/logo.svg'));
  }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--navbar-height', this.navbarHeight + 'px');
  }
}
