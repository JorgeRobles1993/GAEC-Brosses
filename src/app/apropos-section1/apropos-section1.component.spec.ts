import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AproposSection1Component } from './apropos-section1.component';

describe('AproposSection1Component', () => {
  let component: AproposSection1Component;
  let fixture: ComponentFixture<AproposSection1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AproposSection1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AproposSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
