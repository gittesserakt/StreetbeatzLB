import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { COMPONENTS } from './components';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import { MobileComponent } from './components/navbar/mobile/mobile.component';
import { DesktopComponent } from './components/navbar/desktop/desktop.component';


@NgModule({
  declarations: [
    ...COMPONENTS,
    MobileComponent,
    DesktopComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule {}
