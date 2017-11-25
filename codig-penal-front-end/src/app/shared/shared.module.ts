import { NgModule } from "@angular/core";
import { NotFoundComponent } from "./not-found/not-found.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from './navbar/navbar.component';
import { AppRouting } from '../app.routing';

@NgModule({
  declarations: [
    NotFoundComponent,
    FooterComponent,
    NavbarComponent
   ],
  exports: [
    NotFoundComponent,
    FooterComponent,
    NavbarComponent,
   ]
   ,imports:[
     AppRouting,
   ]
})
export class SharedModule {}
