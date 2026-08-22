import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCursus } from './user-cursus';
import { UserCourses } from '../../../services/user-courses';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('UserCursus', () => {
  let component: UserCursus;
  let fixture: ComponentFixture<UserCursus>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCursus],
      providers: [
        UserCourses,
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCursus);
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
