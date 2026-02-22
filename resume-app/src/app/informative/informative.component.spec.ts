import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeComponent } from './informative.component';

describe('InformativeComponent', () => {
  let component: InformativeComponent;
  let fixture: ComponentFixture<InformativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformativeComponent]
    });
    fixture = TestBed.createComponent(InformativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
