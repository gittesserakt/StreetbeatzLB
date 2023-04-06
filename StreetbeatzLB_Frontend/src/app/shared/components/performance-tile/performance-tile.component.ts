import {Component, Input} from '@angular/core';
import {VerbosePerformance} from "../../../core/models/verbosePerformance";
import {Router} from "@angular/router";

@Component({
  selector: 'app-performance-tile',
  templateUrl: './performance-tile.component.html',
  styleUrls: ['./performance-tile.component.scss']
})
export class PerformanceTileComponent {
  group: string;
  stage: string;
  performanceDateTime: string;

  constructor(@Input() private performance: VerbosePerformance, private router: Router) {
    this.group = performance.group;
    this.stage = performance.stage;
    this.performanceDateTime = performance.date_time;
  }

  showLocation(){
    this.router.navigate([`/map?stage=${this.stage}`]);
  }
}
