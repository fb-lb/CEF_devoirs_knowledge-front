import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserElements } from './user-elements';
import { provideRouter } from '@angular/router';
import { UserCourses } from '../../../services/user-courses';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserElements', () => {
  let component: UserElements;
  let fixture: ComponentFixture<UserElements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserElements],
      providers: [
        UserCourses,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserElements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
