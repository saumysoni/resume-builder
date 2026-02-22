import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeDisplayComponent } from './resume-display.component';

describe('ResumeDisplayComponent', () => {
  let component: ResumeDisplayComponent;
  let fixture: ComponentFixture<ResumeDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeDisplayComponent]
    });
    fixture = TestBed.createComponent(ResumeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
