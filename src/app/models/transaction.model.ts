export interface Transaction {
    id?: string;            // Optional for auto-generated Firestore ID
    type: 'income' | 'expense';
    amount: number;
    date: Date;
    description: string;
  }

  export const categoryList=
    {income:['Salary','profit','miscellaneous' ],expense:['Hobbies', 'Grocery', 'Utilities', 'Rent','miscellaneous']}

  