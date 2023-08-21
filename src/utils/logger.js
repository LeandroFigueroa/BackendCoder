import winston from "winston";
import { format } from "winston";
import "winston-mongodb";
import dotenv from 'dotenv'
dotenv.config();
const{combine, printf, timestamp, colorize, prettyPrint }= format



const logConfiguration ={
    transports: [
        winston.add(
            
                new winston.transports.MongoDB({
                    options:{useUnifiedTopology:true},
                    db: process.env.MONGO_URL,
                    collection: "logs",
                    tryReconnect:true,
                    level:"error"
                })
                ),
                new winston.transports.Console({
                    level:'silly',
                    format: combine(timestamp({format:'MMM-DD-YYYY HH:mm:ss'}),       
                         colorize(),
                         printf((info)=>`${info.level} | ${[info.timestamp]} | ${info.message}`)
                )}),
                new winston.transports.File({
                    filename:"./logs.log",
                    level:"info",

                })
            
       
    ]
}
export const logger = winston.createLogger(logConfiguration);

logger.level = 'silly';

logger.silly('mensaje con nivel silly');
logger.debug('mensaje con nivel debug');
logger.verbose('mensaje con nivel verbose');
logger.info('mensaje con nivel info');
logger.http('mensaje con nivel http');
logger.warn('mensaje con nivel warn');
logger.error('mensaje con nivel error');
