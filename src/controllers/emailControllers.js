import {  transporter } from "../services/emailService.js";
import 'dotenv/config';

export const sendGmail = async(req, res)=>{
    try {
        const { dest, name } = req.body;
        const gmailOptions = {
            from: process.env.EMAIL,
            to: dest,
            subject: 'Bienvenido/a',
            html: `<h1>Hola ${name}, te damos la bienvenida </h1>`
        }
        const response = await transporter.sendMail(gmailOptions);
        console.log('email enviado!');
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}