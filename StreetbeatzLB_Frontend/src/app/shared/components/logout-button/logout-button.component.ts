import {Component, Inject} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {APP_BASE_HREF, DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {
  constructor(
    private auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(APP_BASE_HREF) public baseHref: string
  ) {}

  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin + this.baseHref,
      },
    });
  }
}
