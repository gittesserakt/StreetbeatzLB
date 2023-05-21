import { Component, OnInit } from '@angular/core';
import { Artist } from "../../../core/models/artist.model";
import { ArtistService } from "../../../core/services/artist.service";

@Component({
  selector: 'app-landingpage-artists',
  templateUrl: './landingpage-artists.component.html',
  styleUrls: ['./landingpage-artists.component.scss']
})
export class LandingpageArtistsComponent implements OnInit {
  artists: Artist[] = [];
  artistTabs: { artists: Artist[] }[] = [];
  activeTab: number = 0;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.getAllArtists();
  }

  getAllArtists(): void {
    this.artistService.getAllArtists().subscribe((response) => {
      const { data, error } = response;
      console.log('artist', response);

      if (data) {
        this.artists = data as Artist[];
        this.generateArtistTabs();
        console.log(this.artists);
      }
      if (error) {
        console.log(error);
      }
    });
  }

  generateArtistTabs(): void {
    this.artistTabs = [];

    const totalTabs = Math.ceil(this.artists.length / 5);

    for (let i = 0; i < totalTabs; i++) {
      const startIdx = i * 5;
      const endIdx = startIdx + 5;
      const artists = this.artists.slice(startIdx, endIdx);
      this.artistTabs.push({ artists });
    }
  }

  nextTab(): void {
    if (this.activeTab === this.artistTabs.length - 1) {
      this.activeTab = 0;
    } else {
      this.activeTab++;
    }
  }

  prevTab(): void {
    if (this.activeTab === 0) {
      this.activeTab = this.artistTabs.length - 1;
    } else {
      this.activeTab--;
    }
  }
}
