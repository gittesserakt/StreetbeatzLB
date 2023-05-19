import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "@auth0/auth0-angular";
import { take } from "rxjs/operators";
import { VerbosePerformanceService } from "../../../core";
import { VerbosePerformance } from '../../../core/models/verbosePerformance';
import { PerformanceService } from "../../../core/services/performance.service";
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

  @Input() performance!: VerbosePerformance;
  @Input() artists!: Artist[];
  @Input() stages!: Stage[];

  popupName: string = ""; // "Edit Performance" or "Add Performance"
  verbosePerformances?: VerbosePerformance[];
  startTime: string = '';
  selectedArtistId: number = 0;
  selectedStageId: number = 0;
  authSub: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      performance: VerbosePerformance;
      functionName: string;
      performance_popup_id: number;
      p_artist: string;
      p_stage: string;
    },
    private dialogRef: MatDialogRef<PerformancePopupComponent>,
    private authService: AuthService,
    private verbosePerformanceService: VerbosePerformanceService,
    private performanceService: PerformanceService,
    private artistService: ArtistService,
    private stageService: StageService
  ) {}

  ngOnInit() {
    this.popupName = this.data.functionName;
    this.getAllPerformances();
    this.getAllArtists();
    this.getAllStages();
    const labelElement = document.querySelector('#popup-label');
    if (labelElement) {
      labelElement.textContent = `${this.popupName}`;
    }

    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.user$.pipe(take(1)).subscribe({
      next: (user) => {
        this.authSub = user?.sub || ""; // Hier wird der auth0 user sub der variable authSub zugewiesen
        console.log(user); // Hier haben Sie die UserId des aktuellen Benutzers
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getAllPerformances() {
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
    if (this.popupName == "Add Performance" && (this.startTime == '' || this.selectedArtistId == 0 || this.selectedStageId == 0)) {
      if (this.startTime == '') {
        alert("Please select a start time!");
      } else if (this.selectedArtistId == 0) {
        alert("Please select a artist!")
      } else if (this.selectedStageId == 0) {
        alert("Please select a stage!")
      }
    } else {
      if (this.popupName == "Edit Performance") {
        //TODO: If the bug to show the current time in the "Edit Popup" is fixed, a Date object can be passed for startTime.
        // Currently a string is passed, otherwise it leads to an error if the time field is left empty.
        this.verbosePerformanceService.editPerformance(this.data.performance_popup_id, this.startTime, this.selectedArtistId, this.selectedStageId)
          .subscribe(
            (response: any) => {
              const {data, error} = response;

              if (data) {
                console.log("Performance updated successfully: ", data);
              }

              if (error) {
                console.log(error);
              } else {
                this.dialogRef.close();
                location.reload();
              }
            }
          );
      } else {
        this.verbosePerformanceService.addPerformance(new Date(this.startTime), this.authSub, this.selectedArtistId, this.selectedStageId)
          .subscribe(
            (response: any) => {
              const {data, error} = response;

              if (data) {
                console.log("Performance added successfully: ", data);
                this.dialogRef.close();
              }

              if (error) {
                console.log(error);
              } else {
                console.log("Performance updated successfully");
                this.dialogRef.close();
                location.reload();
              }
            }
          );
      }
    }
  }

  checkArtistFree(artistName: string, startTime: String): boolean { //TODO: Im Daily nach Feedback von PO fragen
    if (!this.verbosePerformances) {
      return true; // Return true if verbosePerformances is undefined
    }

    for (const verbosePerformance of this.verbosePerformances) {
      if (verbosePerformance.artist === artistName && verbosePerformance.start_time === startTime) {
        return false;
      }
    }
    return true;
  }

  checkStageFree(stageName: string, startTime: String): boolean {
    if (!this.verbosePerformances) {
      return true; // Return true if verbosePerformances is undefined
    }

    for (const verbosePerformance of this.verbosePerformances) {
      if (verbosePerformance.stage === stageName && verbosePerformance.start_time === startTime) {
        return false;
      }
    }
    return true;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
