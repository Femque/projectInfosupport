import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalenderComponent } from './components/calender/calender.component';
import {FooterComponent} from "./components/footer/footer.component";
import {LoginComponent} from "./components/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalenderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
