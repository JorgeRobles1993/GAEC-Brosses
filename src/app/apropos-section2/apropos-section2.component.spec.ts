import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AproposSection2Component } from './apropos-section2.component';

describe('AproposSection2Component', () => {
  let component: AproposSection2Component;
  let fixture: ComponentFixture<AproposSection2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AproposSection2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AproposSection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
