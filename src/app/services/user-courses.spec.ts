import { TestBed } from '@angular/core/testing';

import { UserCourses } from './user-courses';

describe('UserCourses', () => {
  let service: UserCourses;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCourses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
