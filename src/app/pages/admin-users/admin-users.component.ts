import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // FormBuilder para el formulario
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Asegurarse de importar ReactiveFormsModule

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Asegurarse de importar los módulos necesarios
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  editForm: FormGroup; 
  selectedUser: any = null; 
  isEditing: boolean = false; 
  userToDelete: any = null; 
  isDeleteModalOpen: boolean = false; 
  isCreating: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
      rol: ['', [Validators.required]],
      password: [''], 
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.getUsers(token).subscribe(
        (data: any) => {
          this.users = data;
          console.log('Formulario editForm:', this.editForm); 
        },
        (error) => {
          console.error('Error al obtener los usuarios:', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }

  startEditing(user: any) {
    this.selectedUser = user;
    this.isEditing = true;
    this.isCreating = false;
    this.editForm.get('password')?.clearValidators();
    this.editForm.get('password')?.updateValueAndValidity();
    this.editForm.patchValue({
      name: user.name,
      email: user.email,
      telefono: user.telefono,
      rol: user.rol,
    });
  }

  saveChanges() {
    if (this.editForm.valid) {
      const updatedUser = this.editForm.value;
  
      if (!updatedUser.password) {
        delete updatedUser.password; 
      }
  
      const token = localStorage.getItem('authToken');
      if (token) {
        if (this.isCreating) {
          this.authService.createUser(updatedUser, token).subscribe(
            (response) => {
              this.users.push(response);
              this.isCreating = false;
              this.editForm.reset(); 
            },
            (error) => {
              console.error('Erreur lors de la création de l\'utilisateur:', error);
            }
          );
        } else if (this.isEditing && this.selectedUser) {
          this.authService.updateUser(this.selectedUser.id, updatedUser, token).subscribe(
            (response) => {
              const index = this.users.findIndex(user => user.id === this.selectedUser.id);
              if (index !== -1) {
                this.users[index] = response;
              }
              this.isEditing = false;
              this.selectedUser = null;
              this.editForm.reset(); 
            },
            (error) => {
              console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            }
          );
        }
      }
    }
  }

  cancelCreationOrEditing() {
    this.isCreating = false;
    this.isEditing = false;
    this.editForm.reset(); 
  }

  goToAdminDashboard() {
    this.router.navigate(['/admin']);
  }

  get formControls() {
    return this.editForm.controls;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.userToDelete = null; 
  }

  deleteUser() {
    if (this.userToDelete) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.authService.deleteUser(this.userToDelete.id, token).subscribe(
          (response) => {
            this.users = this.users.filter(user => user.id !== this.userToDelete.id);
            this.closeDeleteModal(); 
          },
          (error) => {
            console.error('Error al eliminar el usuario:', error);
          }
        );
      }
    }
  }

  confirmDelete(user: any) {
    this.userToDelete = user; 
    this.isDeleteModalOpen = true; 
  }

  startCreating() {
    this.isCreating = true;
    this.isEditing = false;
    this.editForm.get('password')?.setValidators([Validators.required]);
    this.editForm.get('password')?.updateValueAndValidity();

    this.editForm.reset(); 
  }
}
