import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUsers } from './back-office-users';
import { FormService } from '../../../services/form.service';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from '../../../services/user.service';

describe('BackOfficeUsers', () => {
  let component: BackOfficeUsers;
  let fixture: ComponentFixture<BackOfficeUsers>;
  let httpMock: HttpTestingController;
  let retrieveAllUsersUserServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeUsers],
      providers: [
        FormService,
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    retrieveAllUsersUserServiceSpy = spyOn(UserService.prototype, 'retrieveAllUsers');
    fixture = TestBed.createComponent(BackOfficeUsers);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
