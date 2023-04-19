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
  generalInformation: String = "Musik aus der ganzen Welt in einer einzigartigen Kulisse, hochkarätige Musiker:innen " +
    "auf elf Bühnen, ein vielfältiges kulinarisches Angebot und viele besondere Momente für kleine und große Besucher: " +
    "Das ist das Internationale Straßenmusikfestival Ludwigsburg, das am Pfingstwochenende vom 26. bis 28. Mai 2023 im " +
    "Blühenden Barock in Ludwigsburg stattfindet. \n\n Über 30 Straßenmusiker:innen und -bands aus allen Teilen der Welt " +
    "präsentieren ein buntes musikalisches Programm – von Singer/Songwriter und Rock/Pop über Latin und Klezmer bis " +
    "HipHop und Country. Wie in jedem Jahr besteht das Line-Up in etwa zur Hälfte aus Publikumslieblingen, die schon " +
    "einmal beim Straßenmusikfestival in Ludwigsburg gespielt haben, und zur Hälfte aus neuen Musiker:innen. \n\n Von " +
    "Freitag bis Sonntag spielen alle Musiker:innen und Bands täglich von 18 bis 23 Uhr auf den zwölf Bühnen, die über " +
    "das gesamte Gelände des Blühenden Barock verteilt sind – von der großen Hauptbühne vor dem Schloss bis zum " +
    "gemütlichen Pavillon mitten im Park. Mit ausliegenden Stimmkarten und auf der Website können die Besucher:innen " +
    "ihre Lieblingsmusiker:innen wählen – die mit den meisten Stimmen spielen am Sonntagabend ab 21.30 Uhr beim großen " +
    "Abschlusskonzert auf der Hauptbühne. \n\n Auch in diesem Jahr spielen alle Künstler:innen ohne Honorar und freuen " +
    "sich über das obligatorische „Hutgeld“ und CD-Verkäufe.";
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
    {url: '/assets/streetMusicFestival/SMF1.jpg', title: '1'},
    {url: '/assets/streetMusicFestival/SMF2.jpg', title: '2'},
    {url: '/assets/streetMusicFestival/SMF3.jpg', title: '3'},
    {url: '/assets/streetMusicFestival/SMF4.jpg', title: '4'},
    {url: '/assets/streetMusicFestival/SMF5.jpg', title: '5'},
    {url: '/assets/streetMusicFestival/SMF6.jpg', title: '6'}
  ];
  //endregion
}
