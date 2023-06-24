import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./features/landingpage/landingpage.module').then((m) => m.LandingpageModule),
  },
  {
    path: 'performances',
    loadChildren: () =>
      import('./features/performances/performances.module').then((m) => m.PerformancesModule),
  },
  {
    path: 'artist/:artistName',
    loadChildren: () =>
      import('./features/artist-view/artist-view.module').then((m) => m.ArtistViewModule),
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
    path: 'imprint',
    loadChildren: () =>
      import('./features/imprint/imprint.module').then((m) => m.ImprintModule),
  },
  {
    path: 'help-page',
    loadChildren: () =>
      import('./features/help-page/help-page.module').then((m) => m.HelpPageModule),
  },
  {
    path: `streetbeatzlb/api`,
    redirectTo: `https://hjetter.ddns.net/streetbeatzlb/api`,
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
