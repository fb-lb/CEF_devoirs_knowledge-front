import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeContents } from './back-office-contents';
import { FormService } from '../../../services/form.service';
import { FormBuilder } from '@angular/forms';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { CoursesService } from '../../../services/courses.service';

describe('BackOfficeContents', () => {
  let component: BackOfficeContents;
  let fixture: ComponentFixture<BackOfficeContents>;
  let httpMock: HttpTestingController;
  let retrieveAllUsersServiceSpy: jasmine.Spy;
  let coursesService: CoursesService;
  let initCoursesServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeContents],
      providers: [
        FormService,
        AuthenticationService,
        FormBuilder,
        ChangeDetectorRef,
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    retrieveAllUsersServiceSpy = spyOn(UserService.prototype, 'retrieveAllUsers').and.resolveTo();
    fixture = TestBed.createComponent(BackOfficeContents);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    coursesService = TestBed.inject(CoursesService);
    initCoursesServiceSpy = spyOn(coursesService, 'init');

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
