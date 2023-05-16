import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import {AdminViewModule} from "./features/admin-view/admin-view.module";

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
    canActivate: [AuthGuard]
  },
  {
    path: 'performances',
    loadChildren: () =>
      import('./features/performances/performances.module').then((m) => m.PerformancesModule),
  },
  {
    path: 'admin-view',
    loadChildren: () =>
      import('./features/admin-view/admin-view.module').then((m) => m.AdminViewModule),
  },
  {
    path: 'map',
    loadChildren: () =>
      import('./features/map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'vote',
    loadChildren: () =>
      import('./features/vote/vote.module').then((m) => m.VoteModule),
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
