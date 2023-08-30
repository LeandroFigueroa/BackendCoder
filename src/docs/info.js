export const info ={
    definition:{
        openapi:'3.0.0',
        info:{
            title: 'Backend Coderhouse Leandro Figueroa',
            version:'1.0.0',
            description:'Tech by Node, express, mongoDb'
        },
        servers:[
            {
                url:'http://localhost:8080'
            }
        ]
    },
    apis: ['./src/docs/*.yml']
}