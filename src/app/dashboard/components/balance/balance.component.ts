import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent {
  @Input() balance: any;
  @Input() totalIncome: any;
  @Input() totalExpense: any;
}
