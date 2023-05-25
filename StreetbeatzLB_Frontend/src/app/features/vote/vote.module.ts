import {NgModule} from "@angular/core";
import {VoteComponent} from "./vote.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared";
import {RouterModule} from "@angular/router";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatListModule} from "@angular/material/list";
import {FormsModule} from "@angular/forms";
@NgModule({
  declarations: [VoteComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: VoteComponent}]),
    MatGridListModule,
    MatButtonModule,
    MatRadioModule,
    MatListModule,
    FormsModule,
  ],
})
export class VoteModule {}
