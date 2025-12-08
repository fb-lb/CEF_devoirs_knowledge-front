import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUsers } from './back-office-users';
import { FormService } from '../../../services/form.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BackOfficeUsers', () => {
  let component: BackOfficeUsers;
  let fixture: ComponentFixture<BackOfficeUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeUsers],
      providers: [
        FormService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
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
