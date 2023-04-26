import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { LandingpageComponent } from './landingpage.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [LandingpageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: LandingpageComponent}]),
    MatGridListModule,
    MatExpansionModule,
  ],
})
export class LandingpageModule {}


