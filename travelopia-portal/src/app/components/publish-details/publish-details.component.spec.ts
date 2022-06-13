import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishDetailsComponent } from './publish-details.component';

describe('PublishDetailsComponent', () => {
  let component: PublishDetailsComponent;
  let fixture: ComponentFixture<PublishDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
