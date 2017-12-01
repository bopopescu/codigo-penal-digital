import { BrowserModule } from '@angular/platform-browser';
import {Component, NgModule, Pipe, PipeTransform} from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRouting } from './app.routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from './app.component';

import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { CapitulosComponent } from './capitulos/capitulos.component';
import { TitulosComponent } from './titulos/titulos.component';
import { AboutUsComponent } from './about-us/about-us.component';

// Apollo
import { GraphQLModule } from './graphql.module';

@Pipe({ name: 'keys',  pure: false })
export class KeysPipe implements PipeTransform {
    transform(value: any, args?: any[]): any[] {
      // check if "routes" exists
      if(value) {
        // create instance vars to store keys and final output
        let keyArr: any[] = Object.keys(value),
            dataArr = [];

        // loop through the object,
        // pushing values to the return array
        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
        });
        // return the resulting array
        return dataArr;
      }
    }
}

@NgModule({
  declarations: [
    AppComponent,KeysPipe,
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
    NgbModule.forRoot(),
    SharedModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
