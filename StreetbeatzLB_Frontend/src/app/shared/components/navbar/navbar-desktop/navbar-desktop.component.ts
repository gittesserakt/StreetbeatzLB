import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar-desktop',
  templateUrl: './navbar-desktop.component.html',
  styleUrls: ['./navbar-desktop.component.scss']
})
export class NavbarDesktopComponent implements OnInit {
  @Input() navbarHeight: number = 64;

  ngOnInit(): void {
    document.documentElement.style.setProperty('--navbar-height', this.navbarHeight + 'px');
  }
}
