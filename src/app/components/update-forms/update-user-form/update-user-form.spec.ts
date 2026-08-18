import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserForm } from './update-user-form';

describe('UpdateUserForm', () => {
  let component: UpdateUserForm;
  let fixture: ComponentFixture<UpdateUserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserForm);
    component = fixture.componentInstance;
    component.userId = 1;
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.email = 'john.doe@example.com';
    component.roles = ['user'];
    component.isVerified = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
