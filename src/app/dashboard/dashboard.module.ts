import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TransactionModule } from '../transaction/transaction.module';
import { AuthGuard } from '../Auth/auth.guard';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { IncomeExpensesComponent } from './components/income-expenses/income-expenses.component';
import { SharedModule } from '../shared/shared.module';
import { BalanceComponent } from './components/balance/balance.component';
import { MonthlyDataChartComponent } from './components/monthly-data-chart/monthly-data-chart.component';
const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TransactionModule,
    RouterModule.forChild(dashboardRoutes),
    NavbarComponent,
    IncomeExpensesComponent,
    BalanceComponent,
    MonthlyDataChartComponent,
    SharedModule,
  ],
})
export class DashboardModule {}
