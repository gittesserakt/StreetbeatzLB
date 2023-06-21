import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { PerformancePopupComponent } from "../performance-popup/performance-popup.component";
import { VerbosePerformanceService } from "../../../core";
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
    private verbosePerformanceService: VerbosePerformanceService) {
    console.log(this.performance);
    this.isAdmin = false; //default value
  }

  showLocation(stageId: string){
    console.log(stageId + ' is the stage id')
    this.router.navigate([`/map`], { queryParams: { stageId: stageId} });
  }

  deletePerformance() {
    const date = new Date(this.performance.start_time);
    const formattedDate = date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }); // For the alert display.

    if (confirm("Do you really want to delete this performance by " + this.performance.artist_id + " on " + formattedDate + " on Stage "
            + this.performance.stage_id + "?")) {
      this.verbosePerformanceService.deletePerformance(this.performance.performance_id)
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
      data: {
        functionName: 'Edit Performance',
        performance_popup_id: this.performance.performance_id,
        p_artist: this.performance.artist_id,
        p_stage: this.performance.stage_id,
        p_time: this.performance.start_time
      }
    });
  }
}
