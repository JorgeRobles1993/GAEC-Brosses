import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-section',
  standalone: true,
  templateUrl: './video-section.component.html',
  styleUrls: ['./video-section.component.css']
})
export class VideoSectionComponent {
  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Reemplaza 'VIDEO_ID' con el ID real del video de YouTube
    this.videoUrl = this.sanitizeUrl('https://www.youtube.com/embed/CM6areo2nGc');
  }

  // Método para sanitizar la URL
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
