import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

import { BackOfficeLogs } from './back-office-logs';

describe('BackOfficeLogs', () => {
  let component: BackOfficeLogs;
  let fixture: ComponentFixture<BackOfficeLogs>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeLogs],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackOfficeLogs);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    httpMock.expectOne(environment.backUrl + '/api/logs/getAll').flush({ success: true, message: 'ok', data: [] });
    expect(component).toBeTruthy();
  });

  it('should display the logs returned by the API in the table', async () => {
    const req = httpMock.expectOne(environment.backUrl + '/api/logs/getAll');
    req.flush({
      success: true,
      message: 'ok',
      data: [
        { _id: '1', createdAt: '2026-01-01T00:00:00.000Z', event: 'LOGIN_SUCCESS', level: 'info', type: 'auth', userId: 'u1', metadata: { ip: '1.2.3.4' } },
        { _id: '2', createdAt: '2026-01-02T00:00:00.000Z', event: 'LOGIN_FAILED', level: 'warn', type: 'auth', metadata: { ip: '1.2.3.4', email: 'a@a.com' } },
      ],
    });
    await fixture.whenStable();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr.table__tbody-row');
    expect(rows.length).toBe(2);
  });
});
