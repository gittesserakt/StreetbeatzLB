import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "@auth0/auth0-angular";
import { VerbosePerformanceService } from "../../../core";
import { VerbosePerformance } from '../../../core/models/verbosePerformance';
import { PerformanceService } from "../../../core/services/performance.service";
import { Performance} from "../../../core";
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
  }

  getIdByArtist(selectedName: string): number {
    const artist = this.artists.find(artist => artist.name === selectedName);
    return artist ? artist.artist_id : 0;
  }

  getIdByStage(selectedStage: string): number {
    const stage = this.stages.find(stage => stage.name === selectedStage);
    return stage ? stage.stage_id : 0;
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

  checkArtistFree(artistName: string, startTime: String): boolean { //TODO: nach Feedback fragen
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
      const performance: Performance = {
        performance_id: this.data.performance_popup_id,
        artist_id: this.selectedArtistId,
        stage_id: this.selectedStageId,
        created_by: 'ZGVubmlzQGdtYWlsLmNvbQ', //this.authService.user$,

        start_time: this.startTime == '' ? '0' :
          new Date(new Date(this.startTime).setTime(new Date(this.startTime).getTime() + (120 * 60 * 1000))).toISOString().slice(0, 19),
        end_time: this.startTime == '' ? '0' :
          new Date(new Date(this.startTime).setTime(new Date(this.startTime).getTime() + (150 * 60 * 1000))).toISOString().slice(0, 19)
      };

      if (this.popupName == "Edit Performance") {
        this.performanceService.editPerformance(performance)
          .subscribe(
            (response: any) => {
              const {data, error} = response;

              if (data) {
                console.log("Performance updated successfully: ", data);
                this.dialogRef.close();
                location.reload();
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
      } else {
        this.performanceService.addPerformance(performance)
          .subscribe(
            (response: any) => {
              const {data, error} = response;

              if (data) {
                console.log("Performance updated successfully: ", data);
                this.dialogRef.close();
                location.reload();
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

  onCancel() {
    this.dialogRef.close();
  }
}
