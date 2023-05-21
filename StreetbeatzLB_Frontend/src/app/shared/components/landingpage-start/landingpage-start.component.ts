import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-landingpage-start',
  templateUrl: './landingpage-start.component.html',
  styleUrls: ['./landingpage-start.component.scss']
})
export class LandingpageStartComponent implements OnInit{
  @Input() device?:string;
  @Input() screenHeightPX!:number;
  @Input() screenWidthPX!:number;
  @Input() text!: string;
  gridWidthPX!: number;
  gridHeightPX!: number;

  ngOnInit(): void {
    this.getGridWidthAndHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.getGridWidthAndHeight();
  }

  getGridWidthAndHeight(){
    if(this.device == 'HandsetPortrait' || this.device == 'TabletPortrait'){
      this.gridWidthPX = this.screenWidthPX;
      this.gridHeightPX = Math.floor(this.screenHeightPX/2) ;
    }else {
      this.gridWidthPX = Math.floor(this.screenWidthPX/2);
      this.gridHeightPX = this.screenHeightPX;
    }
  }
}
