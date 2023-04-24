import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import {AdminLoginComponent} from "./admin-login.component";

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminLoginComponent}]),
  ],
})
export class AdminLoginModule{}
