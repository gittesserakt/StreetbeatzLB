import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { COMPONENTS } from './components';
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
    imports: [
        CommonModule,
        MatCardModule,
    ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule {}
