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
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getProduct(category, id) {
    const dbRef = ref(this.database, `product/${category}/${id}`);
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
