import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceChangeModalComponent } from './device-change-modal.component';

describe('DeviceChangeModalComponent', () => {
  let component: DeviceChangeModalComponent;
  let fixture: ComponentFixture<DeviceChangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceChangeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceChangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
