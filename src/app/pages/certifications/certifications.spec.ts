import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Certifications } from './certifications';
import { UserCourses } from '../../services/user-courses';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Certification', () => {
  let component: Certifications;
  let fixture: ComponentFixture<Certifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Certifications],
      providers: [
        UserCourses,
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Certifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
