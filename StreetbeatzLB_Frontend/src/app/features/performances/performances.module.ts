import { NgModule } from '@angular/core';
import {PerformancesComponent} from "./performances.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [PerformancesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PerformancesComponent}])
  ],
})
export class PerformancesModule {}
