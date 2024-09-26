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
import { ActualitesComponent } from './app/pages/actualites/actualites.component';
import { ActualiteSingleComponent } from './app/pages/actualite-single/actualite-single.component';
import { AdminGuard } from './app/admin.guard';
import { AdminActualitesComponent } from './app/pages/admin-actualites/admin-actualites.component';
import { AdminReservationsComponent } from './app/pages/admin-reservations/admin-reservations.component';
import { AdminUsersComponent } from './app/pages/admin-users/admin-users.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })),
    provideRouter(
      [
        { path: '', component: HomePageComponent },
        { path: 'visit', component: VisitComponent },
        { path: 'a-propos', component: AProposComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'login', component: ConnexionComponent},
        { path: 'register', component: RegisterComponent},
        { path: 'admin', component: HomePageAdminComponent, canActivate: [AdminGuard] },
        { path: 'logout', component: HomePageAdminComponent},
        { path: 'actualites', component: ActualitesComponent},
        { path: 'actualite/:id', component: ActualiteSingleComponent},
        { path: 'admin-actualites', component: AdminActualitesComponent},
        { path: 'admin-reservations', component: AdminReservationsComponent},
        { path: 'admin-users', component: AdminUsersComponent},
      ],
      withComponentInputBinding()
    ),
    importProvidersFrom(BrowserAnimationsModule),
  ],
}).catch((err) => console.error(err));
