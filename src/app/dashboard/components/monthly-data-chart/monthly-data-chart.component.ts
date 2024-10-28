import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Chart,
  registerables,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
} from 'chart.js';
import { FirebaseService } from '../../../common-services/firebase.service';
Chart.register(...registerables);

@Component({
  selector: 'app-monthly-data-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monthly-data-chart.component.html',
  styleUrls: ['./monthly-data-chart.component.scss'],
})
export class MonthlyDataChartComponent implements OnInit {
  @ViewChild('mychart') mychart!: ElementRef<HTMLCanvasElement>;
  // @Input() incomes: any;
  // @Input() expenses: any;
  incomes: any;
  expenses: any;
  availableYears: number[] = [];
  selectedYear: number = new Date().getFullYear();
  incomeData: number[] = Array(12).fill(0);
  expenseData: number[] = Array(12).fill(0);
  rawData: any[] = [];
  chart: Chart | null = null;
  constructor(
    private firebaseService: FirebaseService,
    private changeDetector: ChangeDetectorRef
  ) {}
  async ngOnInit() {
    try {
      this.expenses = await this.firebaseService.getExpenses();
      this.incomes = await this.firebaseService.getIncomes();

      // Combine data into rawData and process it
      this.rawData.push(...this.incomes, ...this.expenses);
      this.processData();

      // Now that data is processed, create the chart
      if (this.mychart && this.mychart.nativeElement) {
        // this.ctx = this.mychart.nativeElement.getContext('2d')!;
        this.createChart();
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  ngOnChanges() {}

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
    this.processData();
    if (this.mychart && this.mychart.nativeElement) {
      this.createChart();
      this.updateChartData();
    }
  }
  ngAfterViewChecked() {
    this.updateChartData();
  }
  processData() {
    const dataByYear: any = {};

    this.rawData.forEach((transaction) => {
      const date = new Date(transaction.date);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (!dataByYear[year]) {
        dataByYear[year] = {
          income: Array(12).fill(0),
          expense: Array(12).fill(0),
        };
        if (!this.availableYears.includes(year)) {
          this.availableYears.push(year);
        }
      }

      const amount = transaction.amount;
      if (transaction.transaction_type === 'income') {
        dataByYear[year].income[month] += amount;
      } else if (transaction.transaction_type === 'expense') {
        dataByYear[year].expense[month] += amount;
      }
    });

    this.availableYears.sort((a, b) => b - a);
    this.incomeData =
      dataByYear[this.selectedYear]?.income || Array(12).fill(0);
    this.expenseData =
      dataByYear[this.selectedYear]?.expense || Array(12).fill(0);

    return dataByYear; // Now returns dataByYear for use in updateChartData
  }

  onYearChange(event: any) {
    this.selectedYear = +event.target.value;
    this.updateChartData();
  }

  updateChartData() {
    const dataByYear = this.processData(); // Now we get dataByYear correctly

    this.incomeData =
      dataByYear[this.selectedYear]?.income || Array(12).fill(0);
    this.expenseData =
      dataByYear[this.selectedYear]?.expense || Array(12).fill(0);

    if (this.chart) {
      this.chart.data.datasets[0].data = this.incomeData;
      this.chart.data.datasets[1].data = this.expenseData;
      this.chart.update();
    }
  }

  createChart() {
    if (!this.chart) {
      this.chart = new Chart(this.mychart.nativeElement.getContext('2d')!, {
        type: 'bar',
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              label: 'Income',
              backgroundColor: 'rgba(75, 192, 192, 0.4)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
              data: this.incomeData,
            },
            {
              label: 'Expenses',
              backgroundColor: 'rgba(255, 99, 132, 0.4)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
              data: this.expenseData,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Income and Expenses',
            },
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount (in Rupees)',
              },
            },
          },
        },
      });
    }
  }
}
