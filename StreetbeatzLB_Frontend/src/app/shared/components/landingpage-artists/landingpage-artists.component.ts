import { Component, OnInit } from '@angular/core';
import { Artist } from "../../../core/models/artist.model";
import { ArtistService } from "../../../core/services/artist.service";
import { AuthService } from "@auth0/auth0-angular";
import { Router } from "@angular/router";

@Component({
  selector: 'app-landingpage-artists',
  templateUrl: './landingpage-artists.component.html',
  styleUrls: ['./landingpage-artists.component.scss']
})
export class LandingpageArtistsComponent implements OnInit {
  artists: Artist[] = [];
  artistTabs: { artists: Artist[] }[] = [];
  activeTab: number = 0;
  expanded: number = 0;

  isAdmin: boolean = false;

  constructor(private artistService: ArtistService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getAllArtists();

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // Benutzer ist als Admin eingeloggt
        this.isAdmin = true;
      }
    });
  }

  getAllArtists(): void {
    this.artistService.getAllArtists().subscribe((response) => {
      const { data, error } = response;

      if (data) {
        this.artists = data as Artist[];
        this.generateArtistTabs();
      }
      if (error) {
        console.log(error);
      }
    });
  }

  generateArtistTabs(): void {
    this.artistTabs = [];

    const totalTabs = Math.ceil(this.artists.length / 3);

    for (let i = 0; i < totalTabs; i++) {
      const startIdx = i * 3;
      const endIdx = startIdx + 3;
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

  toggleExpand(artist_id: number) {
    this.expanded = artist_id;
  }

  toggleExpandLess() {
    this.expanded = 0;
  }

  filter(id: number) {
    if (this.isAdmin) {
      this.router.navigate([`/admin-view`], { queryParams: { artistId: id } });
    } else {
      this.router.navigate([`/performances`], { queryParams: { artistId: id } });
    }
  }
}
