import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RoomModel } from 'src/app/models/room.model';
import * as _ from 'lodash';
import { TransactionService } from 'src/app/services/transaction.service';
import { RoomService } from 'src/app/services/room.service';
import { TransactionModel } from 'src/app/models/transaction.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.scss'],
})
export class SpendingComponent implements OnInit {
  addTransaction = this.fb.group({
    time: ['', Validators.required],
    title: ['', Validators.required],
    amount: ['', Validators.required],
    user: ['', Validators.required],
  });

  editRoom = this.fb.group({
    roomName: ['', Validators.required],
    userList: ['', Validators.required],
  });

  roomData: RoomModel = this.rs.getRoomData();

  transactionData: TransactionModel[] = this.roomData.transactionList;

  memberAmount: any = this.ts.getMemberAmount();

  addModalDisplay: boolean = false;
  editModalDisplay: boolean = false;
  calculateModalDisplay: boolean = false;

  renewData(): void {
    this.roomData = this.rs.getRoomData();
    this.ts.getTransactionList();
    this.memberAmount = this.ts.getMemberAmount();
  }

  showAddDialog() {
    this.addModalDisplay = true;
  }

  showEditDialog() {
    this.editModalDisplay = true;
  }

  showCalculateDialog() {
    this.calculateModalDisplay = true;
  }

  resetAnyFuckingForm() {
    this.addTransaction.reset();
    this.editRoom.setValue({
      roomName: this.rs.getRoomData().roomName,
      userList: this.rs.getRoomData().userList,
    });
  }

  submitAddTransaction() {
    this.ts.addTransaction(this.addTransaction.value);
    this.resetAnyFuckingForm();
    this.renewData();
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Thêm thành công',
    });
  }

  async submitEditRoom() {
    this.rs.updateRoomName(this.editRoom.value.roomName);
    this.rs.updateRoomUserList(this.editRoom.value.userList);
    this.resetAnyFuckingForm();
    this.renewData();
    console.log(await this.rs.getDataFromServer());
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
        this.ts.deleteAllTransaction();
        this.renewData();
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đã xoá dữ liệu',
        });
      },
    });
  }

  constructor(
    private fb: FormBuilder,
    private ts: TransactionService,
    private rs: RoomService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.editRoom.setValue({
      roomName: this.rs.getRoomData().roomName,
      userList: this.rs.getRoomData().userList,
    });
  }
}
