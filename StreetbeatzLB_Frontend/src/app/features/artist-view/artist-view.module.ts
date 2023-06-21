import {NgModule} from "@angular/core";
import {ArtistViewComponent} from "./artist-view.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [ArtistViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: ArtistViewComponent}]),
  ]
})
export class ArtistViewModule{}
