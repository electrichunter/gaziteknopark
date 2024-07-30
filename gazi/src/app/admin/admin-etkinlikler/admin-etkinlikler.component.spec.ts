import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEtkinliklerComponent } from './admin-etkinlikler.component';

describe('AdminEtkinliklerComponent', () => {
  let component: AdminEtkinliklerComponent;
  let fixture: ComponentFixture<AdminEtkinliklerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEtkinliklerComponent]
    });
    fixture = TestBed.createComponent(AdminEtkinliklerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
