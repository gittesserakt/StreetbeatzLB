import { Component } from "@angular/core";
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
}
