import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaberlerAdminComponent } from './haberler-admin.component';

describe('HaberlerAdminComponent', () => {
  let component: HaberlerAdminComponent;
  let fixture: ComponentFixture<HaberlerAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HaberlerAdminComponent]
    });
    fixture = TestBed.createComponent(HaberlerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
