import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import * as _ from 'lodash';

import { RoomService } from 'src/app/services/room.service';
import { TransactionModel } from 'src/app/models/transaction.model';
@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.scss'],
})
export class SpendingComponent implements OnInit {
  // Add new transaction form
  addTransaction = this.fb.group({
    time: ['', Validators.required],
    title: ['', Validators.required],
    amount: ['', Validators.required],
    user: ['', Validators.required],
  });

  // Edit room info form
  editRoom = this.fb.group({
    roomName: ['', Validators.required],
    userList: ['', Validators.required],
  });

  transactionData: TransactionModel[] = [];
  roomName: string = '';
  userList: string[] = [];
  memberAmount: any[] = [];

  loaded: boolean = false;

  addModalDisplay: boolean = false;
  editModalDisplay: boolean = false;
  calculateModalDisplay: boolean = false;

  // MODAL DISPLAY CONTROL
  showAddDialog() {
    this.addModalDisplay = true;
  }

  showEditDialog() {
    this.editModalDisplay = true;
  }

  showCalculateDialog() {
    this.calculateModalDisplay = true;
    this.memberAmount = this.getMemberAmount();
  }

  // ACTION
  submitAddTransaction() {
    this.updateTransaction(this.addTransaction.value);
    this.updateData();
    this.addTransaction.reset();
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Thêm thành công',
    });
  }

  submitEditRoom() {
    this.rs.updateRoomName(this.editRoom.value.roomName);
    this.rs.updateRoomUserList(this.editRoom.value.userList);
    this.updateData();
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Sửa thông tin thành công',
    });
  }

  handleDeleteData() {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xoá lịch sử chi tiêu của phòng?',
      accept: () => {
        this.deleteAllTransaction();
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đã xoá dữ liệu',
        });
      },
    });
  }

  updateTransaction(transaction: TransactionModel): void {
    this.transactionData.push(transaction);
    this.rs.updateTransactionList(this.transactionData);
  }

  deleteAllTransaction(): void {
    this.transactionData = [];
    this.rs.updateTransactionList(this.transactionData);
  }

  getTotalAmount(): number {
    let total: number = 0;

    _.forEach(this.transactionData, (value) => {
      total += value.amount;
    });

    return total;
  }

  getMemberAmount() {
    const averageAmount = _.round(this.getTotalAmount() / this.userList.length);

    const eachMemberAmount = _.map(this.userList, (user) => {
      let tmpTotal = 0;

      _.forEach(this.transactionData, (transaction) => {
        if (transaction.user === user) {
          tmpTotal += transaction.amount;
        }
      });

      tmpTotal -= averageAmount;

      return { name: user, amount: tmpTotal };
    });

    return eachMemberAmount;
  }

  updateData(): void {
    this.rs.getUserList().subscribe({
      next: (data) => {
        this.userList = data;
        this.editRoom.patchValue({
          userList: this.userList,
        });
      },
    });
    this.rs.getRoomName().subscribe({
      next: (data) => {
        this.roomName = data;
        this.editRoom.patchValue({
          roomName: this.roomName,
        });
      },
    });
    this.rs.getTransactionList().subscribe({
      next: (data) => {
        this.transactionData = data;
      },
    });
  }

  constructor(
    private fb: FormBuilder,
    public rs: RoomService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.rs.getUserList().subscribe({
      next: (data) => {
        this.userList = data;
        this.editRoom.patchValue({
          userList: this.userList,
        });
      },
    });
    this.rs.getRoomName().subscribe({
      next: (data) => {
        this.roomName = data;
        this.editRoom.patchValue({
          roomName: this.roomName,
        });
      },
    });
    this.rs.getTransactionList().subscribe({
      next: (data) => {
        this.transactionData = data;
      },
      complete: () => {
        this.loaded = true;
      },
    });
  }
}
