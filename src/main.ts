import { provideRouter, withComponentInputBinding } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

import { HomePageComponent } from './app/home-page/home-page.component';
import { VisitComponent } from './app/visit/visit.component';  // Actualizado
import { AProposComponent } from './app/a-propos/a-propos.component';
import { ContactComponent } from './app/contact/contact.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      [
        { path: '', component: HomePageComponent },
        { path: 'visit', component: VisitComponent },  // Ruta actualizada
        { path: 'a-propos', component: AProposComponent },
        { path: 'contact', component: ContactComponent },
      ],
      withComponentInputBinding()
    ),
  ],
}).catch((err) => console.error(err));
