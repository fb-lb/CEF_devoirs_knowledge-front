import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCourses } from './all-courses';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthenticationService } from '../../services/authentication.service';
import { of } from 'rxjs';

describe('AllCourses', () => {
  let component: AllCourses;
  let fixture: ComponentFixture<AllCourses>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCourses],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            isAuthenticated$: of(true)
          }
        },
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', async () => {
    httpMock.match(() => true).forEach(req => req.flush({ success: true, data: [] }));
    
    await fixture.whenStable();
    
    expect(component).toBeTruthy();
  });
});
