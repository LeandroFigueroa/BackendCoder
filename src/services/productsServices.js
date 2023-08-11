import factory from "../daos/factory.js"
const { productManager }= factory;
import productRepository from "../daos/repository/productsRepository.js";
const prodDao= new productRepository();


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
            throw new Error ('Producto not found');
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
