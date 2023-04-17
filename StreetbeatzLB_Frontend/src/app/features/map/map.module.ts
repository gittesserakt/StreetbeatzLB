import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import {MapComponent} from "./map.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: MapComponent}]),
    LeafletModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
})
export class MapModule {}
