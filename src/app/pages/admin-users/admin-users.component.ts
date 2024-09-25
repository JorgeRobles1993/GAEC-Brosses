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
  editForm: FormGroup; // Formulario de edición/creación
  selectedUser: any = null; // Usuario seleccionado para editar
  isEditing: boolean = false; // Controla si estamos en modo edición
  userToDelete: any = null; // Usuario seleccionado para eliminar
  isDeleteModalOpen: boolean = false; // Controla si el modal de eliminación está abierto
  isCreating: boolean = false; // Controla si estamos en modo creación

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    // Inicializar el formulario de edición/creación
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Validación para números de teléfono
      rol: ['', [Validators.required]],
      password: [''], // Contraseña no es requerida por defecto, pero se añadirá condicionalmente
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.getUsers(token).subscribe(
        (data: any) => {
          this.users = data;
          console.log('Formulario editForm:', this.editForm); // Para depuración
        },
        (error) => {
          console.error('Error al obtener los usuarios:', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }

  // Método para iniciar la edición de un usuario
  startEditing(user: any) {
    this.selectedUser = user;
    this.isEditing = true;
    this.isCreating = false;

    // Quitar la validación de contraseña al editar
    this.editForm.get('password')?.clearValidators();
    this.editForm.get('password')?.updateValueAndValidity();

    // Rellenar el formulario con los datos del usuario seleccionado
    this.editForm.patchValue({
      name: user.name,
      email: user.email,
      telefono: user.telefono,
      rol: user.rol,
    });
  }

  // Guardar los cambios en un usuario (creación o edición)
  saveChanges() {
    if (this.editForm.valid) {
      const updatedUser = this.editForm.value;
  
      // Solo incluimos el campo "password" si fue modificado (si no, no lo enviamos)
      if (!updatedUser.password) {
        delete updatedUser.password; // Si no se introduce password, lo eliminamos del objeto
      }
  
      const token = localStorage.getItem('authToken');
      if (token) {
        if (this.isCreating) {
          // Crear un nuevo usuario
          this.authService.createUser(updatedUser, token).subscribe(
            (response) => {
              this.users.push(response);
              this.isCreating = false;
              this.editForm.reset(); // Resetea el formulario
            },
            (error) => {
              console.error('Erreur lors de la création de l\'utilisateur:', error);
            }
          );
        } else if (this.isEditing && this.selectedUser) {
          // Actualizar el usuario
          this.authService.updateUser(this.selectedUser.id, updatedUser, token).subscribe(
            (response) => {
              const index = this.users.findIndex(user => user.id === this.selectedUser.id);
              if (index !== -1) {
                this.users[index] = response;
              }
              this.isEditing = false;
              this.selectedUser = null;
              this.editForm.reset(); // Resetea el formulario
            },
            (error) => {
              console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            }
          );
        }
      }
    }
  }

  // Cancelar la edición o creación
  cancelCreationOrEditing() {
    this.isCreating = false;
    this.isEditing = false;
    this.editForm.reset(); // Resetear el formulario
  }

  // Navegar de regreso a la dashboard
  goToAdminDashboard() {
    this.router.navigate(['/admin']);
  }

  get formControls() {
    return this.editForm.controls;
  }

  // Cerrar el modal sin eliminar el usuario
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.userToDelete = null; // Limpiar el usuario seleccionado
  }

  // Eliminar al usuario
  deleteUser() {
    if (this.userToDelete) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.authService.deleteUser(this.userToDelete.id, token).subscribe(
          (response) => {
            // Eliminar el usuario de la lista local
            this.users = this.users.filter(user => user.id !== this.userToDelete.id);
            this.closeDeleteModal(); // Cerrar el modal después de eliminar
          },
          (error) => {
            console.error('Error al eliminar el usuario:', error);
          }
        );
      }
    }
  }

  // Abre el modal de confirmación para eliminar al usuario
  confirmDelete(user: any) {
    this.userToDelete = user; // Guardar el usuario que se va a eliminar
    this.isDeleteModalOpen = true; // Abrir el modal de confirmación
  }

  // Iniciar la creación de un nuevo usuario
  startCreating() {
    this.isCreating = true;
    this.isEditing = false;

    // Añadir la validación de contraseña al crear
    this.editForm.get('password')?.setValidators([Validators.required]);
    this.editForm.get('password')?.updateValueAndValidity();

    this.editForm.reset(); // Limpiar el formulario para un nuevo usuario
  }
}
