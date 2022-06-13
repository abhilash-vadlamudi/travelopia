import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDeatilsComponent } from './travel-deatils.component';

describe('TravelDeatilsComponent', () => {
  let component: TravelDeatilsComponent;
  let fixture: ComponentFixture<TravelDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelDeatilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
