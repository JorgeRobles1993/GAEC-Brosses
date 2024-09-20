import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActualitesComponent } from './admin-actualites.component';

describe('AdminActualitesComponent', () => {
  let component: AdminActualitesComponent;
  let fixture: ComponentFixture<AdminActualitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminActualitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActualitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
