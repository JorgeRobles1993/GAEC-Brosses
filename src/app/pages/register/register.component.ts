import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordMismatch: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),  // Campo name agregado
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]), // Cambié minLength a 8
      confirmPassword: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.pattern('^[0-9]*$')]) // Campo telefono opcional
    }, { validator: this.passwordMatchValidator });
  }

  // Validador personalizado para confirmar que las contraseñas coinciden
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    this.passwordMismatch = password !== confirmPassword;
    return password === confirmPassword ? null : { mismatch: true };
  }
  
  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword, telefono } = this.registerForm.value;
  
      const userData = {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword, // Laravel espera el campo password_confirmation
        telefono: telefono || null // El campo telefono es opcional, se envía null si está vacío
      };
  
      // Enviar solicitud POST al backend para registrar al usuario
      this.authService.register(userData).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en el registro:', error);
        }
      );
    }
  }
  
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  // Método para acceder a los controles de manera segura
  getFormControl(controlName: string): FormControl {
    return this.registerForm.get(controlName) as FormControl;
  }
}
