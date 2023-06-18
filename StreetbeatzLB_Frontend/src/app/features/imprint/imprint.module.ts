import {NgModule} from "@angular/core";
import {ImprintComponent} from "./imprint.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [ImprintComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: ImprintComponent}]),
  ]
})
export class ImprintModule{}
