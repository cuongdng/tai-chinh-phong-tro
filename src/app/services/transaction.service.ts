import { Injectable } from '@angular/core';
import { TransactionModel } from '../models/transaction.model';
import { RoomService } from './room.service';

import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: TransactionModel[] =
    this.rs.getRoomData().transactionList;

  public getTransactionList(): TransactionModel[] {
    return this.transactions;
  }

  public addTransaction(transaction: TransactionModel): void {
    this.transactions.push(transaction);
  }

  public getTotalAmount(): number {
    let total: number = 0;

    _.forEach(this.transactions, (value) => {
      total += value.amount;
    });

    return total;
  }

  public deleteAllTransaction(): void {
    this.transactions = [];
  }

  public getMemberAmount() {
    const averageAmount = _.round(
      this.getTotalAmount() / this.rs.getRoomData().userList.length
    );

    const eachMemberAmount = _.map(this.rs.getRoomData().userList, (user) => {
      let tmpTotal = 0;

      _.forEach(this.transactions, (transaction) => {
        if (transaction.user === user) {
          tmpTotal += transaction.amount;
        }
      });

      tmpTotal -= averageAmount;

      return { name: user, amount: tmpTotal };
    });

    return eachMemberAmount;
  }

  constructor(private rs: RoomService) {}
}
