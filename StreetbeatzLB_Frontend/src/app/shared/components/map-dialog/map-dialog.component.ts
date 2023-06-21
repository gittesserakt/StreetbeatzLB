import {Component, Inject, Input} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {APP_BASE_HREF} from "@angular/common";

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent {
  public url: string;
  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(APP_BASE_HREF) private baseHref: string
  ) {
    this.url = (this.baseHref === '/' ? '' : this.baseHref) + '/assets/map/legend.svg';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
