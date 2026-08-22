import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficePurchases } from './back-office-purchases';
import { FormService } from '../../../services/form.service';
import { UserCourses } from '../../../services/user-courses';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from '../../../services/user.service';

describe('BackOfficePurchases', () => {
  let component: BackOfficePurchases;
  let fixture: ComponentFixture<BackOfficePurchases>;
  let httpMock: HttpTestingController;
  let retrieveAllUsersUserServiceSpy: jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficePurchases],
      providers: [
        FormService,
        UserCourses,
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    retrieveAllUsersUserServiceSpy = spyOn(UserService.prototype, 'retrieveAllUsers');
    fixture = TestBed.createComponent(BackOfficePurchases);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
