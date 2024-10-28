import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../../common-services/firebase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-income-expenses',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './income-expenses.component.html',
  styleUrl: './income-expenses.component.scss',
})
export class IncomeExpensesComponent {
  @Input() incomeList: any[] = [];
  @Input() expensesList: any[] = [];
  constructor(
    private fireBaseService: FirebaseService,
    private toasterService: ToastrService
  ) {}
  ngOnChanges() {}
  delete(transactionType: any, id: any, index: number) {
    console.log(id);
    if (transactionType == 'expens') {
      this.expensesList.splice(index, 1);
    } else {
      this.incomeList.splice(index, 1);
    }
    this.fireBaseService.deleteTransaction(transactionType, id);
    console.log(this.expensesList);
  }
}
