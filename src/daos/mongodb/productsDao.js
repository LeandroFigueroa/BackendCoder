import { productsModel } from "./models/productsModel.js";
import { cartModel } from "./models/cartModel.js";



export default class ProductsDaoMongoDB {
  async getAllProducts(query, page = 1, limit = 10, sort = 1) {
    try {
      console.log("mongoDao OK");
      const sortMode = {
        price: sort,
      };
      const response = await productsModel.paginate(query ? { query } : {}, {
        page,
        limit,
        sort: sortMode,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await productsModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await productsModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      await productsModel.findByIdAndUpdate({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await productsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
