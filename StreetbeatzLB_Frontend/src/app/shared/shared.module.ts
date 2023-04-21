import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { COMPONENTS } from './components';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import { FilterDesktopComponent } from './components/filter/filter-desktop/filter-desktop.component';
import { FilterMobileComponent } from './components/filter/filter-mobile/filter-mobile.component';


@NgModule({
  declarations: [
    ...COMPONENTS,
    FilterDesktopComponent,
    FilterMobileComponent,
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
    ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule {}
