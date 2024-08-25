import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEmployeesComponent } from './role-employees.component';

describe('RoleEmployeesComponent', () => {
  let component: RoleEmployeesComponent;
  let fixture: ComponentFixture<RoleEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleEmployeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
