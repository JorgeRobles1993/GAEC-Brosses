import { Component } from '@angular/core';
import { AproposSection1Component } from '../apropos-section1/apropos-section1.component';
import { BannerColaboradoresComponent } from '../banner-colaboradores/banner-colaboradores.component';
import { AproposSection2Component } from '../apropos-section2/apropos-section2.component';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';


@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [AproposSection1Component, BannerColaboradoresComponent, AproposSection2Component, GoogleMapsComponent],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.css'
})
export class AProposComponent {

}
