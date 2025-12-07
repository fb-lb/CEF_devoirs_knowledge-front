import { TestBed } from '@angular/core/testing';

import { UserCourses } from './user-courses';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserCourses', () => {
  let service: UserCourses;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UserCourses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
