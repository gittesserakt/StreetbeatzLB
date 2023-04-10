import { Component, OnInit } from "@angular/core";
import {Performance, PerformanceService} from "../../core";

@Component({
  selector: 'app-messages',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.scss']
})
export class PerformancesComponent {
  performances?: Performance[];

  constructor(private performanceService: PerformanceService) {}

    getAllPerformances(): void {
      this.performanceService.getAllPerformances()
        .subscribe((response) => {
          const { data, error } = response;

          if (data) {
            this.performances = data as Performance[];
          }

          if (error) {
            console.log(error);
          }
        });
    }

    ngOnInit(): void {
      this.getAllPerformances();
    }

}

