import {Component, OnInit} from "@angular/core";
import {VerbosePerformanceService} from "../../core";
import {VerbosePerformance} from "../../core/models/verbosePerformance";

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.scss']
})
export class PerformancesComponent implements OnInit{
  verbosePerformances?: VerbosePerformance[];

  constructor(private verbosePerformanceService: VerbosePerformanceService) {
  }

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

}

