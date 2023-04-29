import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stage} from "../../../../core/models/stage.model";
import {StageService} from "../../../../core/services/stage.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-filter-stageselector',
  templateUrl: './filter-stageselector.component.html',
  styleUrls: ['./filter-stageselector.component.scss']
})
export class FilterStageselectorComponent implements OnInit {
  @Input() inStage!: string | null;
  @Input() stages!: Stage[];
  @Output() outStage= new EventEmitter<string | null>();

  stageChangeEvent(event: string) {
    this.outStage.emit(event);
  }

  constructor(private stageService: StageService) {
  }

  getAllStages(): void {
    this.stageService.getAllStages()
      .subscribe((response) => {
        const {data, error} = response;
        console.log('stages', response);

        if (data) {
          this.stages = data as Stage[];
        }

        if (error) {
          console.log(error);
        }
      });
  }

  ngOnInit(): void {
    this.getAllStages();
  }
}
