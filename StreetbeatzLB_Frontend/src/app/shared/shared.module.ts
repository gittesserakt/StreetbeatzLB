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
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';


@NgModule({
  declarations: [
    ...COMPONENTS,
    MobileComponent,
    DesktopComponent,
    ImageSliderComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    PageLoaderComponent
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
