import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule y FormBuilder

@Component({
  selector: 'app-admin-actualites',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule
  templateUrl: './admin-actualites.component.html',
  styleUrls: ['./admin-actualites.component.css'],
})
export class AdminActualitesComponent implements OnInit {
  actualites: any[] = [];
  editForm: FormGroup;
  createForm: FormGroup;
  selectedActualite: any = null;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  isCreateModalOpen: boolean = false;
  actualiteToDelete: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario de edición
    this.editForm = this.fb.group({
      titre: ['', Validators.required],
      content: ['', Validators.required],
      image: [''], // Opcional
    });

    // Inicializar el formulario de creación
    this.createForm = this.fb.group({
      titre: ['', Validators.required],
      content: ['', Validators.required],
      image: [''], // Opcional
    });
  }

  ngOnInit() {
    // Obtener las publicaciones (actualités)
    this.authService.getPosts().subscribe(
      (data: any) => {
        this.actualites = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des actualités:', error);
      }
    );
  }

  // Abrir el modal de edición
  openEditModal(actualite: any) {
    this.selectedActualite = actualite;
    this.isEditModalOpen = true;

    // Rellenar el formulario con los datos de la actualité seleccionada
    this.editForm.patchValue({
      titre: actualite.titre,
      content: actualite.content,
      image: actualite.image || '',
    });
  }

  // Cerrar el modal de edición
  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedActualite = null;
    this.editForm.reset();
  }

  // Guardar los cambios de la edición
  saveChanges() {
    if (this.editForm.valid && this.selectedActualite) {
      const updatedActualite = {
        ...this.selectedActualite,
        ...this.editForm.value,
      };

      // Llamada al servicio para actualizar la publicación
      this.authService.updatePost(this.selectedActualite.id, updatedActualite).subscribe(
        (response) => {
          const index = this.actualites.findIndex((a) => a.id === this.selectedActualite.id);
          if (index !== -1) {
            this.actualites[index] = response;
          }
          this.closeEditModal();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour:', error);
        }
      );
    }
  }

  // Abrir el modal de confirmación para eliminar
  confirmDelete(actualite: any) {
    this.actualiteToDelete = actualite;
    this.isDeleteModalOpen = true;
  }

  // Cerrar el modal de eliminación
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.actualiteToDelete = null;
  }

  // Eliminar la publicación
  deleteActualite() {
    if (this.actualiteToDelete) {
      this.authService.deletePost(this.actualiteToDelete.id).subscribe(
        (response) => {
          this.actualites = this.actualites.filter((a) => a.id !== this.actualiteToDelete.id);
          this.closeDeleteModal();
        },
        (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      );
    }
  }

  // Abrir el modal para crear una nueva actualité
  openCreateModal() {
    this.isCreateModalOpen = true;
    this.createForm.reset(); // Limpiar el formulario
  }

  // Cerrar el modal de creación
  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  // Crear una nueva actualité
  createActualite() {
    if (this.createForm.valid) {
      const newActualite = this.createForm.value;
      this.authService.createActualite(newActualite).subscribe(
        (response: any) => {
          this.actualites.push(response); // Agregar la nueva actualité a la lista
          this.closeCreateModal(); // Cerrar la modal después de crear
        },
        (error) => {
          console.error('Erreur lors de la création de l\'actualité:', error);
        }
      );
    }
  }

  // Navegar de regreso al dashboard de administración
  goToAdminDashboard() {
    this.router.navigate(['/admin']);
  }

  get formControls() {
    return this.createForm.controls;
  }

}
