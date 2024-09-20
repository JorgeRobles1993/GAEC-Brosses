import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importa también CommonModule si usas directivas como ngIf

@Component({
  selector: 'app-login',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]  // Asegúrate de incluir ReactiveFormsModule aquí
})
export class ConnexionComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.loginError = null;

    if (this.loginForm.valid) {
      this.authService.getCsrfToken().subscribe(() => {
        this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
          .subscribe({
            next: (response) => {
              console.log('Login exitoso:', response);
              this.router.navigate(['']);
            },
            error: (error) => {
              console.error('Error en el login:', error);
              this.loginError = 'Credenciales incorrectas. Intenta de nuevo.';
            }
          });
      });
    }
  }
}
