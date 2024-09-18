import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { GoogleMapsComponent } from "../google-maps/google-maps.component";
import { SocialBannerComponent } from "../social-banner/social-banner.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, GoogleMapsComponent, SocialBannerComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
