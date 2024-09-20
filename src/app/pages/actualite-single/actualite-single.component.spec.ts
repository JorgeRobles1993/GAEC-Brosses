import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiteSingleComponent } from './actualite-single.component';

describe('ActualiteSingleComponent', () => {
  let component: ActualiteSingleComponent;
  let fixture: ComponentFixture<ActualiteSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualiteSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualiteSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
