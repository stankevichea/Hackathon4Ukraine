import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RootModule} from './modules/root-module/root.module';
import {GoogleApiService} from './services/GoogleApiService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RootModule
  ],
  providers: [
    GoogleApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
