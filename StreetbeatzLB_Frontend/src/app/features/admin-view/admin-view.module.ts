import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { AdminViewComponent } from './admin-view.component';
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [AdminViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: AdminViewComponent}]),
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatButtonModule,
        MatTooltipModule,
        MatCheckboxModule
    ],
})
export class AdminViewModule {}
