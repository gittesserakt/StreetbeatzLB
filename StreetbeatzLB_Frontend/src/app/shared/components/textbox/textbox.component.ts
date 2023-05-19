import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent {
  @Input() screenHeightPX!:number;
  @Input() screenWidthPX!:number;
  @Input() text!:string;
}
