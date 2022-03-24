import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TransactionModel } from '../models/transaction.model';

// Firebase
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp } from 'firebase/app';

// RxJS
import { Observable, from, filter, map } from 'rxjs';

const app = initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  // Get current Signed-in user UID
  userLocalStorage: any = localStorage.getItem('user');
  uid = JSON.parse(this.userLocalStorage).uid;

  db = getFirestore(app);

  // Get methods

  public getRoomName(): Observable<string> {
    return from(getDoc(doc(this.db, 'users', this.uid))).pipe(
      filter((docSnap) => docSnap.exists()),
      map((docSnap) => docSnap.get('roomName'))
    );
  }

  public getTransactionList(): Observable<TransactionModel[]> {
    return from(getDoc(doc(this.db, 'users', this.uid))).pipe(
      filter((docSnap) => docSnap.exists()),
      map((docSnap) => docSnap.get('transactionList'))
    );
  }

  public getUserList(): Observable<string[]> {
    return from(getDoc(doc(this.db, 'users', this.uid))).pipe(
      filter((docSnap) => docSnap.exists()),
      map((docSnap) => docSnap.get('userList'))
    );
  }

  // Update methods

  public updateRoomName(newName: string): void {
    const dataRef = doc(this.db, 'users', this.uid);
    setDoc(dataRef, { roomName: newName }, { merge: true }).then(() => {
      console.log('Name changed!');
    });
  }

  public updateRoomUserList(newUserList: string[]): void {
    const dataRef = doc(this.db, 'users', this.uid);
    setDoc(dataRef, { userList: newUserList }, { merge: true }).then(() => {
      console.log('User list changed!');
    });
  }

  public updateTransactionList(newTransactionList: TransactionModel[]) {
    const dataRef = doc(this.db, 'users', this.uid);
    setDoc(
      dataRef,
      { transactionList: newTransactionList },
      { merge: true }
    ).then(() => {
      console.log('Transaction list changed!');
    });
  }

  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}
}
