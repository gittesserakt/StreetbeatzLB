import { Component, EventEmitter, Input, Output, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "@auth0/auth0-angular";
import { Observer } from 'rxjs';
import { VerbosePerformance } from '../../../core/models/verbosePerformance';
import { VerbosePerformanceService } from "../../../core";
import { PerformanceService } from "../../../core/services/performance.service";
import { Performance} from "../../../core";
import { Artist } from "../../../core/models/artist.model";
import { ArtistService } from "../../../core/services/artist.service";
import { Stage } from "../../../core/models/stage.model";
import { StageService } from "../../../core/services/stage.service";

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
  updatedPerformance: VerbosePerformance = { ...this.performance };
  startTime: string = '';
  selectedArtistId: number = 0;
  selectedStageId: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      performance: VerbosePerformance;
      functionName: string;
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
    const artist = this.artists.find(artist => artist.group_id === id);
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

  checkArtistFree(artistName: string, startTime: String): boolean {
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
    const start_time = this.startTime;
    const end_time = new Date(new Date(start_time).getTime() + 30 * 60000).toLocaleString('de-DE', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', second:'2-digit'}).replace(/[-:]/g, ' ');
    const created_by = "Admin ID h8gohg" + ""; //TODO: this.authService.user$
    const artist_id = this.selectedArtistId;
    const stage_id = this.selectedStageId;
    const performance_id = 0;

    const performance: Performance = {
      performance_id,
      start_time,
      end_time,
      created_by,
      artist_id,
      stage_id
    };

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
  }

  editPerformance() {
    const start_time = this.updatedPerformance.start_time;
    const start_period = new Date('2023-05-26 18:00:00');
    const end_period = new Date('2023-05-28 23:00:00');

    if (new Date(start_time) >= start_period && new Date(start_time) <= end_period) {
      if (this.checkArtistFree(this.updatedPerformance.artist, start_time)) {
        if (this.checkStageFree(this.updatedPerformance.stage, start_time)) {

          //TODO: editPerformance()

        } else { alert('The stage is already occupied at that time.'); }
      } else { alert('The artist is already playing on another stage at the time.'); }
    } else { alert('The start time is outside the festival period and must be between 26/05/2023 and 28/05/2023.'); }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
