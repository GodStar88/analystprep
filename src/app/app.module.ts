import { NgModule, ApplicationRef ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { PathLocationStrategy } from '@angular/common';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import { Angular2SocialLoginModule } from 'angular2-social-login';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// primeng


// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { SharedService, AuthGuard, UserService } from './services/index';
// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];
let providers = {
  "google": {
    "clientId": "614031125625-bnju3pdna2odqn3hh3rbc4i2ok9l62mc.apps.googleusercontent.com"
    // "clientId": "614031125625-on3r0hnk86uns9fjfm53fetc7eiocim5.apps.googleusercontent.com"
  },
  // "linkedin": {
  //   "clientId": "LINKEDIN_CLIENT_ID"
  // },
  "facebook": {
    "clientId": "1305229152925402",
    "apiVersion": "v2.9" //like v2.4 
  }
};
export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing,
    Angular2SocialLoginModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS, AuthGuard, SharedService, UserService
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}

Angular2SocialLoginModule.loadProvidersScripts(providers);