import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { SharedModule } from '../../shared';
import { MessagesComponent } from './messages.component';

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    //SharedModule,
    RouterModule.forChild([{ path: '', component: MessagesComponent }]),
  ],
})
export class MessagesModule {}
