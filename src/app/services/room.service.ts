import { Injectable } from '@angular/core';
import { RoomModel } from '../models/room.model';
import { room } from '../shared/mock/room-data';

// Firebase
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  public async getDataFromServer(): Promise<RoomModel> {
    const db = getFirestore();
    let roomData: any;

    const docRef = doc(db, 'users', 'QSLX0VaPA0Yi2ThF3BTTffPg4nv2');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      roomData = docSnap.data();
      return roomData;
    } else {
      console.log('No such document!');
      return {
        roomName: 'test',
        userList: ['tst1', 'tst2'],
        transactionList: [],
      };
    }
  }

  private roomData: RoomModel = room;

  public getRoomData(): RoomModel {
    return this.roomData;
  }

  public updateRoomName(newName: string): void {
    this.roomData.roomName = newName;
  }

  public updateRoomUserList(newUserList: string[]): void {
    this.roomData.userList = newUserList;
  }

  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}
}
