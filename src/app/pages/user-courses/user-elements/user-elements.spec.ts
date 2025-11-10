import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserElements } from './user-elements';

describe('UserElements', () => {
  let component: UserElements;
  let fixture: ComponentFixture<UserElements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserElements]
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
