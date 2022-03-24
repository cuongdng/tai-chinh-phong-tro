import { Injectable } from '@angular/core';
import { TransactionModel } from '../models/transaction.model';
import { RoomService } from './room.service';

import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: TransactionModel[] = [];

  public addTransaction(transaction: TransactionModel): void {
    this.transactions.push(transaction);
  }

  public deleteAllTransaction(): void {
    this.transactions = [];
  }

  constructor(private rs: RoomService) {
    this.rs.getTransactionList().subscribe({
      next: (data) => {
        this.transactions = data;
      },
    });
  }
}
