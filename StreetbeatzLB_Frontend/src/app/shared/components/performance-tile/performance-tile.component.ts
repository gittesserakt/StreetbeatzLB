import {Component, Input} from '@angular/core';
import {VerbosePerformance} from "../../../core/models/verbosePerformance";
import {Router} from "@angular/router";

@Component({
  selector: 'app-performance-tile',
  templateUrl: './performance-tile.component.html',
  styleUrls: ['./performance-tile.component.scss']
})
export class PerformanceTileComponent {

  @Input() performance!: VerbosePerformance;

  constructor(private router: Router) {}

  showLocation(){
    alert("you see something");
    this.router.navigate([`/map?stage=${this.performance.stage}`]);
  }
}
