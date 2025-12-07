import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeContents } from './back-office-contents';
import { FormService } from '../../../services/form.service';
import { FormBuilder } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';

describe('BackOfficeContents', () => {
  let component: BackOfficeContents;
  let fixture: ComponentFixture<BackOfficeContents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeContents],
      providers: [
        FormService,
        FormBuilder,
        ChangeDetectorRef,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackOfficeContents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
