import { NgModule } from '@angular/core';
import { PerformancesComponent } from "./performances.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  declarations: [PerformancesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: PerformancesComponent}]),
        SharedModule,
        MatDividerModule
    ],
})
export class PerformancesModule {}
