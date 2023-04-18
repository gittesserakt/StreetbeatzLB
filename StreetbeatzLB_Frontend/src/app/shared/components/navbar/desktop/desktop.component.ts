import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit{
  @Input() navbarHeight: number = 64;

  ngOnInit(): void {
    document.documentElement.style.setProperty('--navbar-height', this.navbarHeight + 'px');
  }
}
