import {Component, HostListener, OnInit} from '@angular/core';
import { Artist } from "../../../core/models/artist.model";
import { ArtistService } from "../../../core/services/artist.service";
import { AuthService } from "@auth0/auth0-angular";
import { Router } from "@angular/router";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

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
  device: String = "Web";
  screenHeightPX: number = 0;
  screenWidthPX: number = 0;

  displayMap = new Map([
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web']
  ])

  constructor(
    private artistService: ArtistService,
    private router: Router,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver) {
    this.onResize();
  }

  ngOnInit(): void {
    this.getAllArtists();

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // Benutzer ist als Admin eingeloggt
        this.isAdmin = true;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenHeightPX = window.innerHeight - 66;
    this.screenWidthPX = window.innerWidth;
    this.getBreakpoint();
  }

  getBreakpoint(){
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape
    ]).subscribe(result => {
      for(const query of Object.keys(result.breakpoints)){
        if(result.breakpoints[query]){
          this.device = this.displayMap.get(query) as string;
        }
      }
    })

    console.log('Breakpoint: ' + this.device)
  }

  getAllArtists(): void {
    this.artistService.getAllArtists().subscribe((response) => {
      const { data, error } = response;
      console.log('artist', response);

      if (data) {
        this.artists = data as Artist[];
        this.generateArtistTabs();
        // console.log(this.artists);
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
