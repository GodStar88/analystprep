import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { BrowserModule } from '@angular/platform-browser';
import { Pages } from './pages.component';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing,
    BrowserModule,
  ],
  declarations: [Pages],

})
export class PagesModule {
}
