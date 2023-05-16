import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { VerbosePerformance } from "../../../core/models/verbosePerformance";
import { PerformancePopupComponent } from "../performance-popup/performance-popup.component";

@Component({
  selector: 'app-edit-performance-tile',
  templateUrl: './edit-performance-tile.component.html',
  styleUrls: ['./edit-performance-tile.component.scss']
})
export class EditPerformanceTileComponent {

  @Input() performance!: VerbosePerformance;

  constructor(private router: Router, private dialog: MatDialog) {}

  deletePerformance() {
    const date = new Date(this.performance.start_time);
    const formattedDate = date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    if (confirm("Do you really want to delete this entry on " + formattedDate + " on Stage "
        + this.performance.stage + "?")) {
      // löschen
    } else {
    }
  }

  editPerformance() {
    const dialogRef = this.dialog.open(PerformancePopupComponent, {
      width: '500px',
      data: { performance: this.performance, functionName: 'Edit Performance' }
    });

    dialogRef.afterClosed().subscribe((result: VerbosePerformance | undefined) => {
      if (result) {
        this.performance = result;
        console.log('Performance updated:', result);
      } else {
        console.log('Edit canceled.');
      }
    });
  }
}
