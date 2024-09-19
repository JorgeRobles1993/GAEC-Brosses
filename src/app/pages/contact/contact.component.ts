import { Component } from '@angular/core';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps.component';
import { SocialBannerComponent } from '../../components/social-banner/social-banner.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, GoogleMapsComponent, SocialBannerComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
