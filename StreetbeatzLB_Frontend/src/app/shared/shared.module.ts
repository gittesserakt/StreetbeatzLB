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
import {MatGridListModule} from "@angular/material/grid-list";
import { PerformancePopupComponent } from './components/performance-popup/performance-popup.component';
import {FormsModule} from "@angular/forms";
import {EditPerformanceTileComponent} from "./components/edit-performance-tile/edit-performance-tile.component";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    ...COMPONENTS,
    MobileComponent,
    DesktopComponent,
    ImageSliderComponent,
    PerformancePopupComponent,
    EditPerformanceTileComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatListModule,
        MatGridListModule,
        FormsModule,
        MatDialogModule,
    ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule {}
