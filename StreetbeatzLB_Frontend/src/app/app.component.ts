import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'StreetbeatzLB_Frontend';
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;
  navbarHeight: number = 64;

  ngAfterViewInit(){
    this.navbarHeight = this.navbar.navbarHeight;
  }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--navbar-height', this.navbarHeight + 'px');
  }
}
