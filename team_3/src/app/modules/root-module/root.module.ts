import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MainPageComponent} from './main-page/main-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class RootModule {

}
