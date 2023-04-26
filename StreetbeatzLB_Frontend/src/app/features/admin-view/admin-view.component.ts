import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { VerbosePerformanceService } from "../../core";
import { VerbosePerformance } from "../../core/models/verbosePerformance";
import { PerformancePopupComponent } from "../../shared/components/performance-popup/performance-popup.component";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit{
  verbosePerformances?: VerbosePerformance[];

  constructor(private verbosePerformanceService: VerbosePerformanceService, private dialog: MatDialog) {}

  getAllPerformances(): void {
    this.verbosePerformanceService.getAllVerbosePerformances()
      .subscribe((response) => {
        const {data, error} = response;
        console.log('verbosePerformances', response);

        if (data) {
          this.verbosePerformances = data as VerbosePerformance[];
        }

        if (error) {
          console.log(error);
        }
      });
  }

  ngOnInit(): void {
    console.log("performances component init");
    this.getAllPerformances();
  }

  addPerformance() {
    const dialogRef = this.dialog.open(PerformancePopupComponent, {
      width: '500px',
      data: { functionName: 'Add Performance' }
    });

    dialogRef.afterClosed().subscribe((result: VerbosePerformance | undefined) => {
      if (result) {
        //this.performance = result;
        console.log('Performance created:', result);
      } else {
        console.log('Performance canceled.');
      }
    });
  }
}
