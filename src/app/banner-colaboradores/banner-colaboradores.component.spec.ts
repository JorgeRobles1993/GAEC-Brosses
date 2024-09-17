import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerColaboradoresComponent } from './banner-colaboradores.component';

describe('BannerColaboradoresComponent', () => {
  let component: BannerColaboradoresComponent;
  let fixture: ComponentFixture<BannerColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerColaboradoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
