import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VerbosePerformance } from '../../../core/models/verbosePerformance';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-edit-popup',
  templateUrl: './performance-popup.component.html',
  styleUrls: ['./performance-popup.component.scss']
})

export class PerformancePopupComponent {

  @Input() performance!: VerbosePerformance;
  @Output() saved = new EventEmitter<VerbosePerformance>();
  @Output() closed = new EventEmitter();

  updatedPerformance: VerbosePerformance = { ...this.performance };

  constructor(private dialofRef: MatDialogRef<PerformancePopupComponent>) {}

  getDateTime() {
    if (!this.updatedPerformance.start_time) {
      return '';
    }
    const date = new Date(this.updatedPerformance.start_time + 'Z'); // 'Z' für Coordinated Universal Time
    return date.toISOString().slice(0, 16);
  }

  //TODO: Künstler für Combobox aus der DB lesen
  //TODO: vllt, Stages für Combobox aus der DB lesen

  onSave() {
    const start_time = new Date(this.updatedPerformance.start_time);
    const start_period = new Date('2023-05-26');
    const end_period = new Date('2023-05-28');

    if (start_time >= start_period && start_time <= end_period) {
      if (/* künstler bedingung */ true) { //TODO: checken ob Künstler frei ist
        if (/* stage bedingung */ true) { //TODO: checken ob Stage frei ist
          const changedPerformance: VerbosePerformance = {
            performance_id: this.performance.performance_id,
            start_time: start_time.toISOString(),
            end_time: this.performance.end_time,
            artist: this.updatedPerformance.artist,
            stage: this.updatedPerformance.stage
          };
          //TODO: speichern der änderungen
          this.dialofRef.close();
        } else { alert('The stage is already occupied at that time.'); }
      } else { alert('The artist is already playing on another stage at the time.'); }
    } else { alert('The start time is outside the festival period and must be between 26/05/2023 and 28/05/2023.'); }
  }

  onCancel() {
    this.dialofRef.close();
  }
}
