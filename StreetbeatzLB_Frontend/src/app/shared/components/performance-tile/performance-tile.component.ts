import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { PerformancePopupComponent } from "../performance-popup/performance-popup.component";
import { PerformanceService } from "../../../core/services/performance.service";
import { VerbosePerformance } from "../../../core/models/verbosePerformance";

@Component({
  selector: 'app-performance-tile',
  templateUrl: './performance-tile.component.html',
  styleUrls: ['./performance-tile.component.scss']
})
export class PerformanceTileComponent {
  @Input() performance!: VerbosePerformance;
  @Input() isAdmin: boolean;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private performanceService: PerformanceService) {
    this.isAdmin = false; //default value
  }

  showLocation() {
    alert("you see something");
    this.router.navigate([`/map?stage=${this.performance.stage}`]);
  }

  deletePerformance() {
    const date = new Date(this.performance.start_time);
    const formattedDate = date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    if (confirm( this.performance.performance_id + "Do you really want to delete this performance by " + this.performance.artist + " on " + formattedDate + " on Stage "
            + this.performance.stage + "?")) {
      this.performanceService.deletePerformance(this.performance.performance_id)
        .subscribe({
          next: () => {
            console.log(`Performance with ID ${this.performance.performance_id} deleted.`);
            location.reload();
          },
          error: (error : any) => {
            console.log(error);
          }
        });
    }
  }

  editPerformance() {
    this.dialog.open(PerformancePopupComponent, {
      width: '500px',
      data: { performance: this.performance, performance_popup_id: this.performance.performance_id,
        p_artist: this.performance.artist, p_stage: this.performance.stage,
        functionName: 'Edit Performance' }
    });
  }
}
