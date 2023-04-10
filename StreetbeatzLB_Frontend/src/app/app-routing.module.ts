import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./features/landingpage/landingpage.module').then((m) => m.LandingpageModule),
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./features/messages/messages.module').then((m) => m.MessagesModule),
  },
  {
    path: 'performances',
    loadChildren: () =>
      import('./features/performances/performances.module').then((m) => m.PerformancesModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
