import { Component } from '@angular/core';
import { MailService } from '../../mail.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  constructor(private mailService: MailService, private router: Router) {}

  mail = {
    to: 'jorge.robles93@hotmail.com',
    subject: '',
    message: ''
  };

  sendMail() {
    this.mailService.sendMail(this.mail).subscribe(
      response => {
        console.log('Mail sent successfully', response);
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error sending mail', error);
      }
    );
  }
}

