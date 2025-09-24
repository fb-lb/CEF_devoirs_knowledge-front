import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCheck } from './email-check';

describe('EmailCheck', () => {
  let component: EmailCheck;
  let fixture: ComponentFixture<EmailCheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailCheck]
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
