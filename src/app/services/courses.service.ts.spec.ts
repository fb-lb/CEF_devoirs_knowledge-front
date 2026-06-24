import { TestBed } from '@angular/core/testing';

import { CoursesServiceTs } from './courses.service.ts';

describe('CoursesServiceTs', () => {
  let service: CoursesServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
