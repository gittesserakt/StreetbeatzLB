import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { AdminViewComponent } from './admin-view.component';
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [AdminViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([{path: '', component: AdminViewComponent}]),
        MatDividerModule,
        MatIconModule,
        MatTabsModule
    ],
})
export class AdminViewModule {}
