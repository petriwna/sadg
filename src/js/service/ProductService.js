import { DataBase } from '../DataBase';

export class ProductService {
  constructor() {
    this.database = new DataBase();
  }

  async getProductList(category) {
    try {
      const listProduct = await this.database.getProductList(category);
      return listProduct || [];
    } catch (error) {
      console.error(`Error fetching product list for ${category}:`, error);
      return [];
    }
  }

  async getProduct(category, id) {
    try {
      const product = await this.database.getProduct(category, id);
      return product || [];
    } catch (error) {
      console.error(`Error fetching product for ${category} ${id}:`, error);
      return [];
    }
  }
}
