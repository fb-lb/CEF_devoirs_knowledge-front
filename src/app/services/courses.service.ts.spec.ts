import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service.ts';

describe('CoursesServiceTs', () => {
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
