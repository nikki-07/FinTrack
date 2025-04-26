import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../common-services/firebase.service';

@Component({
  selector: 'app-dashboard',
  // standalone: true,
  // imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  incomes: any[] = [];
  expenses: any[] = [];
  balance: number = 0;
  totalIncome: any;
  totalExpense: any;
  constructor(private firebaseService: FirebaseService) {}
  ngOnInit() {
    this.getData();
  }
  async getData() {
    this.expenses = await this.firebaseService.getExpenses();
    this.incomes = await this.firebaseService.getIncomes();
    this.calculateBalance();
  }
  calculateBalance() {
    this.totalIncome = this.incomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );
    this.totalExpense = this.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    this.balance = this.totalIncome - this.totalExpense;
  }
}
