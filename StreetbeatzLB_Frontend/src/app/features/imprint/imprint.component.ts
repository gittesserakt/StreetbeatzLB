import {Component} from '@angular/core';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent {
  imprint: string = "Imprint";
  title1: string = "Information accoridng to § 5 TMG";
  title2: string = "Editorially responsible";

  information: string = "Hochschule Heilbronn \n " +
    "Körperschaft des öffentlichen Rechts \n " +
    "Vertreten durch den Rektor Professor Dr.-Ing Oliver Lenzen \n ";
  addres: string = "Max-Planck-Str. 39 \n" +
    "74081 Heilbronn \n";
  contact: string = "Tel.: 07131 / 504-0 \n" +
    "E-Mail: info@hs-heilbronn.de";

  group:string = "Nicolas Holl \n" +
    "Hannes Jetter \n" +
    "Dennis Deifel \n" +
    "Michel Jouaux \n" +
    "Dominik Buzov \n" +
    "Moutassem Mousa";
}
