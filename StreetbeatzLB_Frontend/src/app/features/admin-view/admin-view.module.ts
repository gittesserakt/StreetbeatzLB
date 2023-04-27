import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { AdminViewComponent } from './admin-view.component';
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {PerformancesModule} from "../performances/performances.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [AdminViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: AdminViewComponent}]),
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        PerformancesModule,
        MatButtonModule
    ],
})
export class AdminViewModule {}
