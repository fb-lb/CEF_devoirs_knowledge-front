import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficePurchases } from './back-office-purchases';
import { FormService } from '../../../services/form.service';
import { UserCourses } from '../../../services/user-courses';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BackOfficePurchases', () => {
  let component: BackOfficePurchases;
  let fixture: ComponentFixture<BackOfficePurchases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficePurchases],
      providers: [
        FormService,
        UserCourses,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
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
