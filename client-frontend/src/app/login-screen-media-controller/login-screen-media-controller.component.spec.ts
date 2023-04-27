import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginScreenMediaControllerComponent } from './login-screen-media-controller.component';

describe('LoginScreenMediaControllerComponent', () => {
  let component: LoginScreenMediaControllerComponent;
  let fixture: ComponentFixture<LoginScreenMediaControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginScreenMediaControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginScreenMediaControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
