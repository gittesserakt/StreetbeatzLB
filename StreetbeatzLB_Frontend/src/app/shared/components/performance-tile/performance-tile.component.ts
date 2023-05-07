import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {VerbosePerformance} from "../../../core/models/verbosePerformance";
import {PerformancePopupComponent} from "../performance-popup/performance-popup.component";

@Component({
  selector: 'app-performance-tile',
  templateUrl: './performance-tile.component.html',
  styleUrls: ['./performance-tile.component.scss']
})
export class PerformanceTileComponent {
  @Input() performance!: VerbosePerformance;
  @Input() isAdmin: boolean;

  constructor(private router: Router, private dialog: MatDialog) {
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
