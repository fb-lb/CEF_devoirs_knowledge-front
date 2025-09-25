import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUsers } from './back-office-users';

describe('BackOfficeUsers', () => {
  let component: BackOfficeUsers;
  let fixture: ComponentFixture<BackOfficeUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackOfficeUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
