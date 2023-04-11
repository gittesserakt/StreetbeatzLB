import {Component} from "@angular/core";
import {VerbosePerformanceService} from "../../core";
import {VerbosePerformance} from "../../core/models/verbosePerformance";

@Component({
  selector: 'app-messages',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.scss']
})
export class PerformancesComponent {
  verbosePerformances?: VerbosePerformance[];

  constructor(private verbosePerformanceService: VerbosePerformanceService) {
  }

  getAllPerformances(): void {
    this.verbosePerformanceService.getAllVerbosePerformances()
      .subscribe((response) => {
        const {data, error} = response;

        if (data) {
          this.verbosePerformances = data as VerbosePerformance[];
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

