import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapSwappingBackgroundComponent } from './wrap-swapping-background/wrap-swapping-background.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapSwappingBackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
