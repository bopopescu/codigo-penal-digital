import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRouting } from './app.routing';
import { RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { CapitulosComponent } from './capitulos/capitulos.component';
import { TitulosComponent } from './titulos/titulos.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    CapitulosComponent,
    TitulosComponent,
    AboutUsComponent,
   ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRouting,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
