import {
    getAllService,
    getByIdService,
    createService,
    updateService,
    deleteService,
    createProductMock,
} from "../services/productsServices.js"
import { HttpResponse } from "../utils/httpResponse.js"
const httpResponse = new HttpResponse()

export const getAllProductsController = async (req, res, next) =>{
    try {
        const {page, limit, query, sort} = req.query
        const docsP = await getAllService(query, page, limit, sort)
        const nextLink = docsP.hasNextPage?`http://localhost:8080/products?page=${docsP.nextPage}`: null
        const prevLink = docsP.hasPrevPage?`http://localhost:8080/products?page=${docsP.prevPage}`: null
         res.json({
            
            payload: docsP.docs,
            info:{
                status: docsP.status,
                pages:docsP.totalPages,
                nextLink,
                prevLink
                

            }
        }

        ) 
    } catch (error) {
        next(error)
    }
}
export const getProductByIdController= async (req, res, next) =>{
    try {
        const { id }= req.params;
        const doc= await getByIdService(id)
        res.json(doc)
    } catch (error) {
        next(error)
    }
}
export const createProductController= async (req, res, next) =>{
    try {
        const { name, description, price, stock } = req.body
        const newProduct = await createService({
            name,
            description, 
            price,
            stock
        });
        res.json(newProduct)

    } catch (error) {
        next(error)
        
    }
}
export const updateProductController = async (req, res, next) =>{
    try {
        const { id } = req.params
        const { name, description, price, stock} = req.body;
        let doc = await  getByIdService(id);
        const update = await updateService(
            id,
            { name, description, price, stock }
        )
        res.json(update)
    } catch (error) {
        next(error)
    }
}
export const deleteProductController = async (req, res, next) =>{
    try {
        const { id }= req.params;
        await deleteService(id);
        res.send('Producto eliminado')
    } catch (error) {
        
    }
}

export const createProductMockController = async (req,res,next) =>{
    const {quantity}=req.query
     try {
         const response = await createProductMock(quantity);
         return httpResponse.Ok(res, response)
     } catch (error) {
         next(error)
     }
 }
