import factory from "../daos/factory.js"

import productRepository from "../daos/repository/productsRepository.js";
import { generateProducts } from "../utils/productsFaker.js";
import { productsModel } from "../daos/mongodb/models/productsModel.js";


const prodDao= new productRepository();
const { productManager }= factory;

export const getAllService = async (query,page, limit,sort)=>{
    try {
        const docs = await prodDao.getAllProducts(query,page, limit,sort)
        return docs
    } catch (error) {
        console.log(error)
    }
}
export const getByIdService = async (id)=>{
    try {
        const doc = await prodDao.getProductById(id);
        if(!doc) throw new Error('Not Found')
        else return doc
    } catch (error) {
        console.log(error)
    }
}
export const createService = async (obj)=>{
    try {
        const newProd = await prodDao.createProduct(obj);
        if(!newProd) throw new Error('Error Validated')
        else return newProd
    } catch (error) {
        console.log(error)
    }
}
export const updateService = async (id, obj)=>{
    try {
        const doc = await prodDao.getProductById(id);
        if (!doc){
            throw new Error ('Producto not found')
        } else {
            const prodUpt = await prodDao.updateProduct(id,obj)
            return prodUpt;
        }

    } catch (error) {
        console.log(error)
    }
}
export const deleteService = async (id)=>{
    try {
        const prodDel = await prodDao.deleteProduct(id)
        return prodDel
    } catch (error) {
        console.log(error)
    }

}


export const createProductMock =async (quantity=50)=>{
    const productArray=[];
    for (let i=0;i<quantity;i++ ){
        const product = generateProducts();
        productArray.push(product)
    };
    console.log('BEFORE Modelservice................................................................')
    const productsmok = await productsModel.create(productArray)
    console.log('AFTER Modelservice................................................................')

    return productsmok
}