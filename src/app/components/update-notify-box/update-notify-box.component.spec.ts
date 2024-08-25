import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotifyBoxComponent } from './update-notify-box.component';

describe('UpdateNotifyBoxComponent', () => {
  let component: UpdateNotifyBoxComponent;
  let fixture: ComponentFixture<UpdateNotifyBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateNotifyBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateNotifyBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
