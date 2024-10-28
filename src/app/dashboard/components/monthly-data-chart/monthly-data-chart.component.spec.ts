import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDataChartComponent } from './monthly-data-chart.component';

describe('MonthlyDataChartComponent', () => {
  let component: MonthlyDataChartComponent;
  let fixture: ComponentFixture<MonthlyDataChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyDataChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
