import {Component, ElementRef} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {SlideInterface} from "../../shared/components/image-slider/types/slide.interface";

function getStringDay(date: Date): String {
  let day = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];
  return  day[date.getDay()];
}

function getStringMonth(date: Date): String {
  let day = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Julie", "August", "September", "Oktober", "November", "Dezember"];
  return  day[date.getMonth()];
}

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
  //region dateVariables
  startDate: Date = new Date(2023,4, 26);
  endDate: Date = new Date(2023,4, 28);
  startDay: String = getStringDay(this.startDate);
  endDay: String = getStringDay(this.endDate);
  month: String = getStringMonth(this.startDate);
  startTime: Number = 18;
  endTime: Number = 23;
  //endregion

  //region generalInformationVariable
  generalInformation: String = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.   \n" +
    "\n" +
    "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   \n" +
    "\n" +
    "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer";
  //endregion

  //region responsiveVariables
  device: string | undefined;
  displayMap = new Map([
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web']
  ]);
  //endregion

  //region landingpageVariables
  hDate: number | undefined;
  hTime: number | undefined;
  note1WidthHeight: number | undefined;
  note2WidthHeight: number | undefined;
  guitarWidth: number | undefined;
  guitarHeight: number | undefined;
  imageSliderWidth: number | undefined;
  imageSliderHeight: number  | undefined;
  expansionTitle: number | undefined;
  expansionText: number | undefined;
  expanded = false;
  //endregion

  //region Observer
  constructor(private breakpointObserver: BreakpointObserver, private el:ElementRef) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.WebLandscape
    ]).subscribe(result =>{
      console.log(result);
      for(const query of Object.keys(result.breakpoints)){
        if(result.breakpoints[query]){
          this.device = this.displayMap.get(query) as string;
        }
      }
      console.log(this.device);

      if (this.device === 'Web'){
        this.hDate = 4;
        this.hTime = 2.5;
        this.note1WidthHeight = 4;
        this.note2WidthHeight = 5.5;
        this.guitarWidth = 17;
        this.guitarHeight = 18;
        this.imageSliderWidth= 90;
        this.imageSliderHeight = 35;
        this.expansionTitle = 2.5;
        this.expansionText = 1.25;
      }else {
        this.hDate = 2;
        this.hTime = 1.4;
        this.note1WidthHeight = 3;
        this.note2WidthHeight = 3.5;
        this.guitarWidth = 12;
        this.guitarHeight = 13;
        this.imageSliderWidth= 20;
        this.imageSliderHeight = 30;
        this.expansionTitle = 1.4;
        this.expansionText = 1.2;
      }
    })
  }

  //endregion

  //region SlideInterface
  slides: SlideInterface[] = [
    {url: '/assets/copyrightFree/copyrightFree-1.jpg', title: '1'},
    {url: '/assets/copyrightFree/copyrightFree-2.jpg', title: '2'},
    {url: '/assets/copyrightFree/copyrightFree-3.jpg', title: '3'},
    {url: '/assets/copyrightFree/copyrightFree-4.jpg', title: '4'},
  ];
  //endregion
}
