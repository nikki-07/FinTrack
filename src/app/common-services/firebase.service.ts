import { inject, Injectable } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  constructor() {}

  //   async  addEmptyTravel(userId: String) {
  //     ...
  //     addDoc(collection(this.firestore, 'travels'), travelData).then((travelRef) => {
  //             collection(this.firestore, `travels/${travelRef.id}/stops`);
  //             setDoc(travelRef, {... travelData, id:  travelRef.id})
  //             this.router.navigate(['edit', `${travelRef.id}`]);
  //             return  travelRef;

  //     })
  // }
  // Add income to Firestore
  addIncome(data: any) {
    const incomesCollection = collection(this.firestore, 'incomes');
    return addDoc(incomesCollection, data);
  }

  // Add expense to Firestore
  addExpense(data: any) {
    const expensesCollection = collection(this.firestore, 'expenses');
    return addDoc(expensesCollection, data);
  }

  async getIncomes() {
    // return getDocs(collection(this.firestore,'incomes'))
    const incomesCollection = collection(this.firestore, 'incomes');
    const incomesSnapshot = await getDocs(incomesCollection);
    return incomesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // return this.firestore.collection('incomes').valueChanges();
  }

  // Get all expenses
  async getExpenses() {
    const expensesCollection = collection(this.firestore, 'expenses');
    const expensesSnapshot = await getDocs(expensesCollection);
    return expensesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  deleteTransaction(type: string, transactionId: string): Promise<void> {
    const transactionDoc = doc(this.firestore, type, transactionId);

    return deleteDoc(transactionDoc)
      .then(() => {
        console.log(
          `Transaction with ID ${transactionId} deleted successfully from ${type}.`
        );
      })
      .catch((error) => {
        console.error('Error deleting transaction: ', error);
        throw error; // Rethrow the error to handle it in the component
      });
  }
}
