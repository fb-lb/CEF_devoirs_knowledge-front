import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserThemes } from './user-themes';
import { UserCourses } from '../../../services/user-courses';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserThemes', () => {
  let component: UserThemes;
  let fixture: ComponentFixture<UserThemes>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserThemes],
      providers: [
        UserCourses,
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserThemes);
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
