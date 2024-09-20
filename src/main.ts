import { provideRouter, withComponentInputBinding } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HomePageComponent } from './app/pages/home-page/home-page.component';
import { VisitComponent } from './app/pages/visit/visit.component';
import { AProposComponent } from './app/pages/a-propos/a-propos.component';
import { ContactComponent } from './app/pages/contact/contact.component';
import { ConnexionComponent } from './app/pages/connexion/connexion.component';
import { RegisterComponent } from './app/pages/register/register.component';
import { provideHttpClient } from '@angular/common/http';
import { HomePageAdminComponent } from './app/pages/home-page-admin/home-page-admin.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(
      [
        { path: '', component: HomePageComponent },
        { path: 'visit', component: VisitComponent },
        { path: 'a-propos', component: AProposComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'login', component: ConnexionComponent},
        { path: 'register', component: RegisterComponent},
        { path: 'admin', component: HomePageAdminComponent},
        { path: 'logout', component: HomePageAdminComponent},
      ],
      withComponentInputBinding()
    ),
    importProvidersFrom(BrowserAnimationsModule),
  ],
}).catch((err) => console.error(err));
