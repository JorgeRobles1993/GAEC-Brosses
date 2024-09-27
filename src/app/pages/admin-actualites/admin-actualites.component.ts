import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-admin-actualites',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
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
    this.editForm = this.fb.group({
      titre: ['', Validators.required],
      content: ['', Validators.required],
      image: [''],
    });

    this.createForm = this.fb.group({
      titre: ['', Validators.required],
      content: ['', Validators.required],
      image: [''], 
    });
  }

  ngOnInit() {
    this.authService.getPosts().subscribe(
      (data: any) => {
        this.actualites = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des actualités:', error);
      }
    );
  }

  openEditModal(actualite: any) {
    this.selectedActualite = actualite;
    this.isEditModalOpen = true;
    this.editForm.patchValue({
      titre: actualite.titre,
      content: actualite.content,
      image: actualite.image || '',
    });
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedActualite = null;
    this.editForm.reset();
  }

  saveChanges() {
    if (this.editForm.valid && this.selectedActualite) {
      const updatedActualite = {
        ...this.selectedActualite,
        ...this.editForm.value,
      };

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

  confirmDelete(actualite: any) {
    this.actualiteToDelete = actualite;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.actualiteToDelete = null;
  }

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

  openCreateModal() {
    this.isCreateModalOpen = true;
    this.createForm.reset();  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  createActualite() {
    if (this.createForm.valid) {
      const newActualite = this.createForm.value;
      this.authService.createActualite(newActualite).subscribe(
        (response: any) => {
          this.actualites.push(response); 
          this.closeCreateModal(); 
        },
        (error) => {
          console.error('Erreur lors de la création de l\'actualité:', error);
        }
      );
    }
  }

  goToAdminDashboard() {
    this.router.navigate(['/admin']);
  }

  get formControls() {
    return this.createForm.controls;
  }

}
