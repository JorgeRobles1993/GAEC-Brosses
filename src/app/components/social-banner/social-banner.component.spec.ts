import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialBannerComponent } from './social-banner.component';

describe('SocialBannerComponent', () => {
  let component: SocialBannerComponent;
  let fixture: ComponentFixture<SocialBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
