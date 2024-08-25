import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolePageComponent } from './add-role-page.component';

describe('AddRolePageComponent', () => {
  let component: AddRolePageComponent;
  let fixture: ComponentFixture<AddRolePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRolePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRolePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
