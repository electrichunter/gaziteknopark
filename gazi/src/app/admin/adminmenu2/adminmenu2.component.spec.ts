import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminmenu2Component } from './adminmenu2.component';

describe('Adminmenu2Component', () => {
  let component: Adminmenu2Component;
  let fixture: ComponentFixture<Adminmenu2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Adminmenu2Component]
    });
    fixture = TestBed.createComponent(Adminmenu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
