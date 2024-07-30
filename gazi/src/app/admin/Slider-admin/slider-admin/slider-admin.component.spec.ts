import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderAdminComponent } from './slider-admin.component';

describe('SliderAdminComponent', () => {
  let component: SliderAdminComponent;
  let fixture: ComponentFixture<SliderAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderAdminComponent]
    });
    fixture = TestBed.createComponent(SliderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
