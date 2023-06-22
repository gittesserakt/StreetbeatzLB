import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-landingpage-info',
  templateUrl: './landingpage-info.component.html',
  styleUrls: ['./landingpage-info.component.scss']
})
export class LandingpageInfoComponent {
  @Input() screenHeightPX!:number;
  @Input() screenWidthPX!:number;
  @Input() text!: string;

  title : string = "Music in" + '\n' + "Ludwigsburg";
}
