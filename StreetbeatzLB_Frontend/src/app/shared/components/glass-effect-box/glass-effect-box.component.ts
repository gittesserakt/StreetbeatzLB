import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-glass-effect-box',
  templateUrl: './glass-effect-box.component.html',
  styleUrls: ['./glass-effect-box.component.scss']
})
export class GlassEffectBoxComponent {
  @Input() width!:number;
  @Input() height!:number;
  @Input() unit!:string;

}
