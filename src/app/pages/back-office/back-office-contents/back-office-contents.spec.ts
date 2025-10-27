import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeContents } from './back-office-contents';

describe('BackOfficeContents', () => {
  let component: BackOfficeContents;
  let fixture: ComponentFixture<BackOfficeContents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeContents]
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
