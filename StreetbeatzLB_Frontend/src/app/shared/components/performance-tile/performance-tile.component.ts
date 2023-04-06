import { Component } from '@angular/core';

@Component({
  selector: 'app-performance-tile',
  templateUrl: './performance-tile.component.html',
  styleUrls: ['./performance-tile.component.scss']
})
export class PerformanceTileComponent {
  group!: string;
  stage!: string;
  performanceDateTime!: string;

}
