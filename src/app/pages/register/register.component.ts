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
      name: new FormControl('', [Validators.required]),  
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]), 
      confirmPassword: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.pattern('^[0-9]*$')]) 
    }, { validator: this.passwordMatchValidator });
  }

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
        password_confirmation: confirmPassword, 
        telefono: telefono || null 
      };
  
      this.authService.register(userData).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en el registro:', error);
          // TODO afficher message d'erreur span email doublon
        }
      );
    }
  }
  
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  getFormControl(controlName: string): FormControl {
    return this.registerForm.get(controlName) as FormControl;
  }
}
