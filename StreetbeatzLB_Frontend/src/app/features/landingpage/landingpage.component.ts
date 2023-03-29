import { Component } from '@angular/core';

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
//The monthIndex works 0-base. Not the least bit confusing.
  startDate: Date = new Date(2023,4, 26);
  endDate: Date = new Date(2023,4, 28);
  startDay: String = getStringDay(this.startDate);
  endDay: String = getStringDay(this.endDate);
  month: String = getStringMonth(this.startDate);
  startTime: Number = 18;
  endTime: Number = 23;

  //region General information
  generalInformation1: String = "Musik aus der ganzen Welt in einer einzigartigen Kulisse, hochkarätige Musiker:innen auf elf Bühnen, ein vielfältiges kulinarisches Angebot und viele besondere Momente für kleine und große Besucher: Das ist das Internationale Straßenmusikfestival Ludwigsburg, das am Pfingstwochenende vom 26. bis 28. Mai 2023 im Blühenden Barock in Ludwigsburg stattfindet.";
  generalInformation2: String = "Über 30 Straßenmusiker:innen und -bands aus allen Teilen der Welt präsentieren ein buntes musikalisches Programm – von Singer/Songwriter und Rock/Pop über Latin und Klezmer bis HipHop und Country. Wie in jedem Jahr besteht das Line-Up in etwa zur Hälfte aus Publikumslieblingen, die schon einmal beim Straßenmusikfestival in Ludwigsburg gespielt haben, und zur Hälfte aus neuen Musiker:innen.";
  generalInformation3: String = "Von Freitag bis Sonntag spielen alle Musiker:innen und Bands täglich von 18 bis 23 Uhr auf den zwölf Bühnen, die über das gesamte Gelände des Blühenden Barock verteilt sind – von der großen Hauptbühne vor dem Schloss bis zum gemütlichen Pavillon mitten im Park. Mit ausliegenden Stimmkarten und auf der Website können die Besucher:innen ihre Lieblingsmusiker:innen wählen – die mit den meisten Stimmen spielen am Sonntagabend ab 21.30 Uhr beim großen Abschlusskonzert auf der Hauptbühne.";
  generalInformation4: String = "Auch in diesem Jahr spielen alle Künstler:innen ohne Honorar und freuen sich über das obligatorische „Hutgeld“ und CD-Verkäufe.";
  //endregion

  //region Fillertext
  loremIpsum: String = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   \n" +
    "\n" +
    "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   \n" +
    "\n" +
    "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.   \n" +
    "\n" +
    "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.   \n" +
    "\n" +
    "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.   \n" +
    "\n" +
    "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur";
  //endregion
}
