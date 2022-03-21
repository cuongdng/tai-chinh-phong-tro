import { TransactionModel } from './transaction.model';

export interface RoomModel {
  roomName: string;
  userList: string[];
  transactionList: TransactionModel[];
}
