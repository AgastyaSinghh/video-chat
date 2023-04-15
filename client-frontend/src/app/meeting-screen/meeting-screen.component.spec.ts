import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingScreenComponent } from './meeting-screen.component';

describe('MeetingScreenComponent', () => {
  let component: MeetingScreenComponent;
  let fixture: ComponentFixture<MeetingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
