import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { COMPONENTS } from './components';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import { MobileComponent } from './components/navbar/mobile/mobile.component';
import { DesktopComponent } from './components/navbar/desktop/desktop.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import {RouterLink} from "@angular/router";
import {MatGridListModule} from "@angular/material/grid-list";


@NgModule({
  declarations: [
    ...COMPONENTS,
    MobileComponent,
    DesktopComponent,
    ImageSliderComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
    MatGridListModule,
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule {}
