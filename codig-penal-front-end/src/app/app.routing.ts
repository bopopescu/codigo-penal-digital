import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { CapitulosComponent } from './capitulos/capitulos.component';
import { TitulosComponent } from './titulos/titulos.component';
import { AboutUsComponent } from './about-us/about-us.component';
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'titulos',
    children:[
        {
          path:'',
         component: TitulosComponent
       },
      {
        path: 'capitulo/:name',
        component: CapitulosComponent
      },
    ]

  },
  {
    path: 'contacto',
    component: ContactComponent
  },
  // {
  //   path: 'about-us',
  //   component: AboutUsComponent
  // },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const AppRouting = RouterModule.forRoot(appRoutes, {
  useHash: false
});
