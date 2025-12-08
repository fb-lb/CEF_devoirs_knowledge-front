import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCursus } from './user-cursus';
import { UserCourses } from '../../../services/user-courses';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('UserCursus', () => {
  let component: UserCursus;
  let fixture: ComponentFixture<UserCursus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCursus],
      providers: [
        UserCourses,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCursus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
