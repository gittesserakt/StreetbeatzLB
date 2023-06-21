import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "@auth0/auth0-angular";
import { take } from "rxjs/operators";
import { VerbosePerformanceService } from "../../../core";
import { ArtistService } from "../../../core/services/artist.service";
import { Artist } from "../../../core/models/artist.model";
import { StageService } from "../../../core/services/stage.service";
import { Stage } from "../../../core/models/stage.model";

@Component({
  selector: 'app-edit-popup',
  templateUrl: './performance-popup.component.html',
  styleUrls: ['./performance-popup.component.scss']
})

export class PerformancePopupComponent implements OnInit{

  // [(ngModel)]
  startTime!: string;
  startDate!: string;
  selectedArtistId: number = 0;
  selectedStageId: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      functionName: string;   // "Edit Performance" or "Add Performance"
      performance_popup_id: number;
      p_artist: string;
      p_stage: string;
      p_time: string;
    },
    private dialogRef: MatDialogRef<PerformancePopupComponent>,
    private authService: AuthService,
    private verbosePerformanceService: VerbosePerformanceService,
    private artistService: ArtistService,
    private stageService: StageService
  ) {

    if(this.data.functionName == "Edit Performance") {
      [this.startDate, this.startTime] = this.data.p_time.split('T');
    }
  }

  artists!: Artist[];
  stages!: Stage[];
  authSub!: string;

  ngOnInit() {
    this.getAllArtists();
    this.getAllStages();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.user$.pipe(take(1)).subscribe({
      next: (user) => {
        this.authSub = user?.sub || ""; // Hier wird der auth0 user sub der variable authSub zugewiesen.
        //console.log(user);  //Benutzerdaten in console ausgeben, zum manuellen Hinzufügen von Admins.
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getAllArtists() {
    this.artistService.getAllArtists()
      .subscribe((response) => {
        const {data, error} = response;
        console.log('artists', response);

        if (data) {
          this.artists = data as Artist[];
        }

        if (error) {
          console.log(error);
        }
      })
  }

  getAllStages() {
    this.stageService.getAllStages()
      .subscribe((response) => {
        const {data, error} = response;
        console.log('stages', response)

        if (data) {
          this.stages = data as Stage[];
        }

        if (error) {
          console.log(error);
        }
      })
  }

  savePerformance() {
    const startTimeDate = this.startDate + " " + this.startTime;
    if (this.data.functionName == "Add Performance" && (startTimeDate == " " || this.selectedArtistId == 0 || this.selectedStageId == 0)) {
      if (startTimeDate == " ") {
        alert("Please select a start time and date!");
      } else if (this.selectedArtistId == 0) {
        alert("Please select a artist!")
      } else if (this.selectedStageId == 0) {
        alert("Please select a stage!")
      }
    } else {

      const start_period = new Date('2023-05-26 18:00');
      const end_period = new Date('2023-05-28 23:00');

      if (new Date(startTimeDate) >= start_period && new Date(startTimeDate) <= end_period) {
            if (this.data.functionName == "Edit Performance") {
              this.verbosePerformanceService.editPerformance(this.data.performance_popup_id, new Date(startTimeDate), this.selectedArtistId, this.selectedStageId)
                .subscribe(
                  (response: any) => {
                    const {data, error} = response;

                    if (error) {
                      console.log(error);
                    } else {
                      // console.log("Performance updated successfully: ", data);
                      // console.log("Please refresh the page to see updated entries!")
                      this.dialogRef.close();
                      location.reload();
                    }
                  }
                );
            } else {
              this.verbosePerformanceService.addPerformance(new Date(startTimeDate), this.authSub, this.selectedArtistId, this.selectedStageId)
                .subscribe(
                  (response: any) => {
                    const {data, error} = response;

                    if (error) {
                      console.log(error);
                    } else {
                      // console.log("Performance added successfully: ", data);
                      // console.log("Please refresh the page to see updated entries!")
                      this.dialogRef.close();
                      location.reload();
                    }
                  }
                );
            }
      } else { alert('The date or time is outside the festival period and must be between 05/26/2023, 6:00 pm and 05/28/2023, 11:00 pm.'); }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
