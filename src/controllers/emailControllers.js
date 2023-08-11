import {  mailOption2,  Transportter } from "../services/emailService.js";

export const sendMailEthereal = async( req,res)=>{
    try {
        const response = await Transportter.sendMail(mailOption2);
        console.log('email enviado!!!');
        res.send(response)
    } catch (error) {
        console.log(error)
        
    }
}