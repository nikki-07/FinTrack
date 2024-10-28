import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../common-services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from './services/transaction.service';
import { categoryList } from '../models/transaction.model';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent implements OnInit {
  transactionType: string = 'expense'; // Default to 'income'
  amount: number = 0;
  description: string = '';
  transactionForm!: FormGroup;
  categories = categoryList;
  filteredCategories: any;
  @Output() updateData = new EventEmitter<any>();
  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private transactionService: TransactionService
  ) {}
  ngOnInit(): void {
    this.formInit();
  }
  formInit() {
    this.transactionForm = this.formBuilder.group({
      transaction_type: ['expense', Validators.required],
      category: ['miscellaneous'],
      amount: ['', Validators.required],
      date: [new Date(), Validators.required], // default to today's date,
      text: ['', Validators.required],
      description: [''],
    });
  }
  addTransaction() {
    console.log('this.transactionForm.value', this.transactionForm.value);
    this.transactionForm.value.date = this.transactionForm.value.date
      .toISOString()
      .split('T')[0];
    if (this.transactionForm.value.transaction_type === 'income') {
      this.firebaseService
        .addIncome(this.transactionForm.value)
        .then((res) => {
          console.log(res);
          this.toasterService.success('Income added successfully!');
          this.transactionForm.reset();
          this.updateData.emit();
          this.transactionForm.markAsUntouched();
        })
        .catch((error: any) => {
          console.error(error);
        });
    } else {
      this.firebaseService
        .addExpense(this.transactionForm.value)
        .then((res) => {
          console.log(res);

          this.toasterService.success('Expense added successfully!');
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }
  get categoriesList(): string[] {
    return this.transactionForm.get('transaction_type')?.value === 'income'
      ? this.categories.income
      : this.categories.expense;
  }
  // filterCategories(value: string = ''): void {
  //   const filterValue = value.toLowerCase();
  //   this.filteredCategories = this.categories.filter(option =>
  //     option.toLowerCase().includes(filterValue)
  //   );
  // }
  // loadCategories(): void {
  //   this.transactionService.getCategories().subscribe((data) => {
  //     this.categories = data;
  //   });
  // }

  // addCategory(): void {
  //   const categoryData = this.transactionForm.value.category;
  //   this.transactionService.addCategory(categoryData).then(() => {
  //     this.transactionForm.reset();
  //     this.loadCategories(); // Refresh the list
  //   });
  // }

  // deleteCategory(id: string): void {
  //   this.transactionService.deleteCategory(id).then(() => {
  //     this.loadCategories(); // Refresh the list
  //   });
  // }
}
