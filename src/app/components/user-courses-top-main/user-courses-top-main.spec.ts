import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoursesTopMain } from './user-courses-top-main';
import { UserCourses } from '../../services/user-courses';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserCoursesTopMain', () => {
  let component: UserCoursesTopMain;
  let fixture: ComponentFixture<UserCoursesTopMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCoursesTopMain],
      providers: [ 
        UserCourses,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCoursesTopMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
