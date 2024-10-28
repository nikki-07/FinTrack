import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IncomeExpensesComponent } from '../dashboard/components/income-expenses/income-expenses.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MonthlyDataChartComponent } from '../dashboard/components/monthly-data-chart/monthly-data-chart.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    ToastrModule,
    NavbarComponent,
    IncomeExpensesComponent,
    MatAutocompleteModule,
    MonthlyDataChartComponent,
    MatIconModule,
  ],
  exports: [
    MatTabsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    ToastrModule,
    ReactiveFormsModule,
    IncomeExpensesComponent,
    NavbarComponent,
    MatAutocompleteModule,
    MonthlyDataChartComponent,
    MatIconModule,
  ],
  providers: [provideToastr()],
})
export class SharedModule {}
