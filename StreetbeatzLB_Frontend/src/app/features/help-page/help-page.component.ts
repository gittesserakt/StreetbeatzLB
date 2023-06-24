import { Component } from '@angular/core';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent {
  //region Login
  loginHelpTitle: string = "Admin log in:";

  loginHelpTitle1: string = "How do I log in as an admin?";
  loginHelpText1: string = "If you want to log in, you first have to navigate to Home and scroll all the way down to the end of the page. There you can see the title \"Infos\" with 4 points underneath it. The 4 points are \"Performances\",  \"Map\",  \"Vote\" and \"Log In\" and with a click on the yellow point \"Log In\" you get redirected to a new page to type in your e-mail and password to log in.";

  loginHelpTitle2: string = "Can I create an account without being an admin?";
  loginHelpText2: string = "No, that is not possible because it was never intended that artists or visitors of the festival have an account. The login option is solely for the purpose of managing this WebApp.";
  //endregion

}
