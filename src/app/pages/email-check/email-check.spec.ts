import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCheck } from './email-check';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('EmailCheck', () => {
  let component: EmailCheck;
  let fixture: ComponentFixture<EmailCheck>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailCheck],
      providers: [
        provideRouter([]),
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailCheck);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    httpMock.expectOne(environment.backUrl + '/api/inscription/check-email').flush({success: true, message: ''});
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
