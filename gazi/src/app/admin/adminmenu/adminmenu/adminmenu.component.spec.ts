import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminmenuComponent } from './adminmenu.component';

describe('AdminmenuComponent', () => {
  let component: AdminmenuComponent;
  let fixture: ComponentFixture<AdminmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  
});
