import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment as env } from '../environments/environment';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LandingpageComponent } from './features/landingpage/landingpage.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LandingpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AuthModule.forRoot({
      ...env.auth0,
      httpInterceptor: {
        allowedList: [
          `${env.api.serverUrl}/messages`,
        ],
      },
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
