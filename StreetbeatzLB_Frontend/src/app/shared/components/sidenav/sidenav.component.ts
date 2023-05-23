import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "@auth0/auth0-angular";
import {APP_BASE_HREF} from "@angular/common";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private authService: AuthService,
              @Inject(APP_BASE_HREF) public baseHref: string) {
    iconRegistry.addSvgIcon('streetbeatz', sanitizer.bypassSecurityTrustResourceUrl('./assets/streetbeatzLogo/logo.svg'));
  }
  @Output() toggleSidenav = new EventEmitter();
  sidenavBackground: any = {
    'background-image': `url(${this.baseHref + 'assets/design/landingpage_blue-magenta-background.svg'})`,
  };

  toggleSidenavEvent() {
    this.toggleSidenav.emit();
  }
}
