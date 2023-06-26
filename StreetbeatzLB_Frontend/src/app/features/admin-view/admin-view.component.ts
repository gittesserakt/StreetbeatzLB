import {Component, HostListener} from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { VerbosePerformanceService } from "../../core";
import { VerbosePerformance } from "../../core/models/verbosePerformance";
import { PerformancePopupComponent } from "../../shared/components/performance-popup/performance-popup.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import { AuthService } from '@auth0/auth0-angular';
import {AdministratorService} from "../../core/services/administrator.service";
import {Administrator} from "../../core/models/administrator.model";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent {
  verbosePerformances?: VerbosePerformance[];

  device: String = "Web";

  screenHeightPX: number = 0;
  screenWidthPX: number = 0;

  displayMap = new Map([
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web']
  ])

  constructor(
    private verbosePerformanceService: VerbosePerformanceService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    public administratorService: AdministratorService
  ) {
    this.onResize();
    this.auth.user$.subscribe(user => {
      // check if user is admin with administrator service
      if (user?.email && user?.nickname) {
        this.administratorService.checkAdministrator(new Administrator(user.email, user.nickname, null)).subscribe(response => {
          const {data, error} = response;

          if (error) {
            console.error(error);
            this.auth.logout();
          }
        });
      }
    });
  }

  addPerformance(): void {
    this.dialog.open(PerformancePopupComponent, {
      width: '500px',
      data: { functionName: 'Add Performance' }
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
}
