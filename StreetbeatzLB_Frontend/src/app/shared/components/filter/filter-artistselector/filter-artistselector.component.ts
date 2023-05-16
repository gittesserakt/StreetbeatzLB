import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArtistService} from "../../../../core/services/artist.service";
import {Artist} from "../../../../core/models/artist.model";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-filter-artistselector',
  templateUrl: './filter-artistselector.component.html',
  styleUrls: ['./filter-artistselector.component.scss']
})
export class FilterArtistselectorComponent implements OnInit {
  @Input() inArtist!: string | null;
  @Input() artists!: Artist[];
  @Output() outArtist= new EventEmitter<string | null>();

  artistChangeEvent(event: string) {
    this.outArtist.emit(event);
  }
  constructor(private artistService: ArtistService) {
  }

  getAllArtists(): void {
    this.artistService.getAllArtists()
      .subscribe((response) => {
        const {data, error} = response;
        console.log('artists', response);

        if (data) {
          this.artists = data as Artist[];
        }

        if (error) {
          console.log(error);
        }
      });
  }

  ngOnInit(): void {
    this.getAllArtists();
  }
}
