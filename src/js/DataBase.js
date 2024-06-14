import { get, ref } from 'firebase/database';

import { database } from './Firebase';

export class DataBase {
  constructor() {
    this.database = database;
  }

  async getProductList(category) {
    const dbRef = ref(this.database, `product/${category}`);
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      }
      console.log('No data available');
      return null;
    } catch (error) {
      console.error('Error getting data: ', error);
      throw error;
    }
  }
}
