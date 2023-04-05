import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import {MapComponent} from "./map.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: MapComponent}]),
    LeafletModule,
  ],
})
export class MapModule {}
