import {Component, ElementRef} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

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
//The monthIndex works 0-base. Not the least bit confusing.
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
  device:String = "Web";
  displayMap = new Map([
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web']
  ])
  //endregion

  //region Observer
  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.WebLandscape
    ]).subscribe(result =>{
      console.log(result);
      for(const query of Object.keys(result.breakpoints)){
        if(result.breakpoints[query]){
          this.device = this.displayMap.get(query) as String;
        }
      }
      console.log(this.device);
    })

  }

  //endregion
}
