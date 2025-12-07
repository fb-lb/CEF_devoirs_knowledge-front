import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserThemes } from './user-themes';
import { UserCourses } from '../../../services/user-courses';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserThemes', () => {
  let component: UserThemes;
  let fixture: ComponentFixture<UserThemes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserThemes],
      providers: [
        UserCourses,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserThemes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // afterEach(() => {
  //   fixture.destroy();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
