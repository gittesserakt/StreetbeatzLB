import {Component, HostListener} from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { VerbosePerformanceService } from "../../core";
import { VerbosePerformance } from "../../core/models/verbosePerformance";
import { PerformancePopupComponent } from "../../shared/components/performance-popup/performance-popup.component";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent {
  verbosePerformances?: VerbosePerformance[];
  screenHeightPX: number = 0;
  screenWidthPX: number = 0;

  constructor(
    private verbosePerformanceService: VerbosePerformanceService,
    private dialog: MatDialog,
  ) {}

  addPerformance(): void {
    this.dialog.open(PerformancePopupComponent, {
      width: '500px',
      data: { functionName: 'Add Performance' }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenHeightPX = window.innerHeight - 70;
    this.screenWidthPX = window.innerWidth;
  }

}
