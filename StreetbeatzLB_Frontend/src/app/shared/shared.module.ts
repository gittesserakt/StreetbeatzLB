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
import {MatGridListModule} from "@angular/material/grid-list";
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import {RouterLink} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FilterTimepickerComponent } from './components/filter/filter-timepicker/filter-timepicker.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { PerformancePopupComponent } from './components/performance-popup/performance-popup.component';
import {FormsModule} from "@angular/forms";
import {EditPerformanceTileComponent} from "./components/edit-performance-tile/edit-performance-tile.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    ...COMPONENTS,
    ImageSliderComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    PageLoaderComponent,
    FilterTimepickerComponent,
    PageLoaderComponent,
    ImageSliderComponent,
    PerformancePopupComponent,
    EditPerformanceTileComponent,
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
    MatExpansionModule,
    MatChipsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
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
        MatTooltipModule,
    ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule {}
