import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLessons } from './user-lessons';
import { UserCourses } from '../../../services/user-courses';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('UserLessons', () => {
  let component: UserLessons;
  let fixture: ComponentFixture<UserLessons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLessons],
      providers: [
        UserCourses,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLessons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
