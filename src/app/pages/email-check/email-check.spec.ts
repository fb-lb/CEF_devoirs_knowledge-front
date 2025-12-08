import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCheck } from './email-check';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EmailCheck', () => {
  let component: EmailCheck;
  let fixture: ComponentFixture<EmailCheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailCheck],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailCheck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
