import { cartModel } from "./models/cartModel.js";
import { productsModel } from "./models/productsModel.js";
export default class CartDao {
  async getCarts() {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      console.log("ERROR:NOT FOUND");
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartModel.findById(id);
      return cart;
    } catch (error) {
      console.log("ERROR:NOT FOUND BY ID");
    }
  }
  async createCart(obj) {
    try {
      const newCart = await cartModel.create(obj);
      return newCart;
    } catch (error) {
      console.log(error);
      throw new Error("ERROR: NO SE PUEDE CREAR EL CARRITO");
    }
  }

  async updateCart(id, obj) {
    try {
      const updCart = await cartModel.findByIdAndUpdate(id, obj);

      return updCart;
    } catch (error) {
      console.log(error);
    }
  }

  async cartDeleteOne(cId, prodId) {
    try {
      const cart = await cartModel.findById(cId);
      console.log(cart);
      if (!cart) throw new Error("ERROR: NO SE PUEDE");
      const prodInCart = cart.products.findIndex((p) => p === prodId);
      cart.products.splice(prodInCart, 1);
      console.log(cart);
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) throw new Error("ERROR: NOT_FOUND");
      console.log(pid);
      const productInCart = cart.products.find((p) => p._id == pid);
      if (!productInCart)
        throw new Error("ERROR: SU BUSQUEDA NO COINCIDE CON LO QUE BUSCA");
      const upProd = await productsModel.updateProduct(pid, { quantity });
      if (!upProd) throw new Error("ERROR DE CANTIDAD");
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cartId, prodId) {
    try {
      const cart = await cartModel.findById(cartId);
      console.log(cart);
      cart.products.push(prodId);
      await cart.save();
      return cart;
    } catch (error) {
      console.log("error");
    }
  }

  async generateTkt(cid) {
    try {
      console.log("cartDao cid :::::" + cid);
      const cart = await cartModel.findById(cid);
      if (!cart) {
        throw new Error("ERROR: NO SE ENCONTRO LO SOLICITADO");
      }

      const prodInCart = cart.products;
      const tktProductIds = [];
      let totalPrice = 0;

      for (const pid of prodInCart) {
        const prod = await productsModel.findById(pid);
        if (!prod) {
          throw new Error(`ERROR: PRODUCTO NO ENCONTRADO N°:${pid}`);
        }
        console.log("prod:::::" + prod);
        console.log("prodQuantity::::" + prod.quantity);
        if (prod.quantity >= 1) {
          prod.quantity -= 1;
          await prod.save();
          tktProductIds.push(pid);
          totalPrice += prod.price;
        } else {
          throw new Error("ERROR: NO HAY SUFICIENTES PRODUCTOS");
        }
        console.log("cart.products::::" + prod);

        cart.products.pull(pid);
        await cart.save();
        const tkt = {
          productIds: tktProductIds,
          cantidad: tktProductIds.length,
          precioTotal: totalPrice,
        };

        return tkt;
      }
    } catch (error) {
      console.log("ERROR: NO SE PUEDE GENERAR EL TICKET DE COMPRAS:", error);
      throw error;
    }
  }

}
