import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeCreateComponent } from './resume-create.component';

describe('ResumeCreateComponent', () => {
  let component: ResumeCreateComponent;
  let fixture: ComponentFixture<ResumeCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeCreateComponent]
    });
    fixture = TestBed.createComponent(ResumeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
