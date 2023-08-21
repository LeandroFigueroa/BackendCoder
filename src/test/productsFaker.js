import { faker } from "@faker-js/faker"
faker.local = "es"


export const generateProducts =()=>{
    return{
        
        name:faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: 200,
        quantity: 10,
    };
}