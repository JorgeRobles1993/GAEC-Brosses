import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialiser le formulaire avec ses champs et ses validations
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Méthode pour gérer l'envoi du formulaire
  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value); // Ici, les données du formulaire peuvent être envoyées au backend
      // Vous pouvez ajouter de la logique supplémentaire comme nettoyer le formulaire, afficher un message de succès, etc.
    }
  }
}
