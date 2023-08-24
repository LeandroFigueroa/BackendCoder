import { faker } from "@faker-js/faker"
faker.local = "es"


export const generateProducts =()=>{
    return{
        
        name:faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price:  faker.number.int({ max: 10000, min:4000}),
        quantity:  faker.number.int({ max:15, min:2 }),
    };
}