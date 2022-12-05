import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightResultsComponent } from './flight-results.component';

describe('FlightResultsComponent', () => {
  let component: FlightResultsComponent;
  let fixture: ComponentFixture<FlightResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
