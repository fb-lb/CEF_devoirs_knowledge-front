import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCourses } from './all-courses';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AllCourses', () => {
  let component: AllCourses;
  let fixture: ComponentFixture<AllCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCourses],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
