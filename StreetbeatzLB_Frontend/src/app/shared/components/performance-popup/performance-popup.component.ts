import { Component, EventEmitter, Input, Output, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "@auth0/auth0-angular";
import { Observer } from 'rxjs';
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
  @Output() saved = new EventEmitter<VerbosePerformance>();
  @Output() closed = new EventEmitter();

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

  getArtistById(id: number): Artist {
    const artist = this.artists.find(artist => artist.artist_id === id);
    return artist ? artist : {} as Artist;
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

  getStageById(id: number): Stage {
    const stage = this.stages.find(stage => stage.stage_id === id);
    return stage ? stage : {} as Stage;
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

  createPerformance() {
    const start_time = new Date(new Date(this.startTime).setTime(new Date(this.startTime).getTime() + (150 * 60 * 1000))).toISOString().slice(0, 19);
    const artist_id = this.selectedArtistId;
    const stage_id = this.selectedStageId;

    const performance_id = 0;
    const created_by = "Admin ID 7ate9" + ""; //TODO: this.authService.user$
    const end_time = new Date(new Date(start_time).setTime(new Date(start_time).getTime() + (150 * 60 * 1000))).toISOString().slice(0, 19);
    // (150 * 60 * 1000) addiert 30 min zur Startzeit

    /*const start_period = new Date('2023-05-26 18:00');
    const end_period = new Date('2023-05-28 23:00');

    if (new Date(start_time) >= start_period && new Date(start_time) <= end_period) {
      if (this.checkArtistFree(this.updatedPerformance.artist, start_time)) {
        if (this.checkStageFree(this.updatedPerformance.stage, start_time)) {*/

          const performance: Performance = {
            performance_id,
            start_time,
            end_time,
            created_by,
            artist_id,
            stage_id
          };

          console.log("p_id: " + performance_id);
          console.log("start: " + start_time);
          console.log("end: " + end_time);
          console.log(created_by);
          console.log("a_id: " + artist_id);
          console.log("s_id: " + stage_id);

          const observer: Observer<Performance> = {
            next: (performance) => {
              const verbosePerformance: VerbosePerformance = {
                ...performance,
                artist: this.getArtistById(artist_id)?.name,
                stage: this.getStageById(stage_id)?.name
              };
              this.saved.emit(verbosePerformance);
            },
            error: (err) => console.log(err),
            complete: () => console.log('Observer completed!')
          };

          this.performanceService.addPerformance(performance)
            .subscribe(observer);

          this.dialogRef.close();

        /*} else { alert('The stage is already occupied at that time.'); }
      } else { alert('The artist is already playing on another stage at the time.'); }
    } else { alert('The start time is outside the festival period and must be between 26/05/2023 and 28/05/2023.'); }*/
  }

  editPerformance() {
    const performance: Performance = {
      performance_id: this.data.performance_popup_id,
      artist_id: this.selectedArtistId,
      stage_id: this.selectedStageId,
      start_time: this.startTime == '' ? '0' :
        new Date(new Date(this.startTime).setTime(new Date(this.startTime).getTime() + (120 * 60 * 1000))).toISOString().slice(0, 19),
      // localtime + 2 Stunden
      end_time: this.startTime == '' ? '0' :
        new Date(new Date(this.startTime).setTime(new Date(this.startTime).getTime() + (150 * 60 * 1000))).toISOString().slice(0, 19),
      created_by: 'nobody'  //created_by wird beim edit nicht aktualisiert
    };

    this.performanceService.editPerformance(performance)
      .subscribe(
        (response: any) => {
          const { data, error } = response;

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

  onCancel() {
    this.dialogRef.close();
  }
}
