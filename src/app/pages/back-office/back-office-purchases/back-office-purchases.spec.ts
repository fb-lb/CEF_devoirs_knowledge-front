import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficePurchases } from './back-office-purchases';

describe('BackOfficePurchases', () => {
  let component: BackOfficePurchases;
  let fixture: ComponentFixture<BackOfficePurchases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficePurchases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackOfficePurchases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
