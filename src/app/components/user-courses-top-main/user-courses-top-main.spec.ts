import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoursesTopMain } from './user-courses-top-main';

describe('UserCoursesTopMain', () => {
  let component: UserCoursesTopMain;
  let fixture: ComponentFixture<UserCoursesTopMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCoursesTopMain]
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
