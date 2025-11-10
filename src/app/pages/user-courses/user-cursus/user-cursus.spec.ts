import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCursus } from './user-cursus';

describe('UserCursus', () => {
  let component: UserCursus;
  let fixture: ComponentFixture<UserCursus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCursus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCursus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
