import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabelInputComponent } from './custom-label-input.component';

describe('CustomLabelInputComponent', () => {
  let component: CustomLabelInputComponent;
  let fixture: ComponentFixture<CustomLabelInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLabelInputComponent]
    });
    fixture = TestBed.createComponent(CustomLabelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
