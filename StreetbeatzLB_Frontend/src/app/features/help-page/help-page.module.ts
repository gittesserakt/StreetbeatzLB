import {NgModule} from "@angular/core";
import {HelpPageComponent} from "./help-page.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [HelpPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: HelpPageComponent}]),
  ]
})
export class HelpPageModule{}
