import { createTransport } from "nodemailer";
import dontenv from "dotenv";
import { templateHTML } from "./newMessage.js";
dontenv.config()

export const Transportter = createTransport({
    host: process.env.HOST,
    port: process.env.PORT_ETHEREAL,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS
    }

})

export const mailOption={
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Felicedades',
    text:'Muchas gracias por participar',
    html:'<h1>Bienvenido</h1>'
}
export const mailOption2={
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Feliciades',
    text:'Estamos encantados que formes parte de nosotros',
    html: templateHTML,
    attachments: [
        {
            path: process.cwd()+ '/src/services/texto.txt',
            filename: 'Tu grato nombre'
        }
    ]
}