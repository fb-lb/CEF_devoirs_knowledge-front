import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsPayed } from './lessons-payed';

describe('LessonsPayed', () => {
  let component: LessonsPayed;
  let fixture: ComponentFixture<LessonsPayed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsPayed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsPayed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
