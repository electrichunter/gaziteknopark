import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillMenuComponent } from './skill-menu.component';

describe('SkillMenuComponent', () => {
  let component: SkillMenuComponent;
  let fixture: ComponentFixture<SkillMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillMenuComponent]
    });
    fixture = TestBed.createComponent(SkillMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
