import { Inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private collectionName = 'categories';
  firestore:Firestore= Inject(Firestore)
  constructor() {}
 // Add a new category
 addCategory(data: any): Promise<any> {
  const categoriesCollection = collection(this.firestore, this.collectionName);
  return addDoc(categoriesCollection, data);
}

// Get all categories
getCategories(): Observable<any[]> {
  const categoriesCollection = collection(this.firestore, this.collectionName);
  return new Observable((observer) => {
    getDocs(categoriesCollection)
      .then((snapshot) => {
        const categories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        observer.next(categories);
      })
      .catch((error) => observer.error(error));
  });
}

// Delete a category by ID
deleteCategory(id: string): Promise<void> {
  const categoryDoc = doc(this.firestore, `${this.collectionName}/${id}`);
  return deleteDoc(categoryDoc);
}
}
