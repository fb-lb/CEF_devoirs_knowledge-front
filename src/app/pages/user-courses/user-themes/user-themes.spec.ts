import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserThemes } from './user-themes';

describe('UserThemes', () => {
  let component: UserThemes;
  let fixture: ComponentFixture<UserThemes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserThemes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserThemes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
