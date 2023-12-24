import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepository } from '../domain/repository/log.repository';
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { envs } from '../config/plugins/env.plugins';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { EmailService } from "./email/email.service";
import { MongoLogDataSource } from '../infrastructure/datasource/mongo-log.datasource';
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDataSource } from '../infrastructure/datasource/postgres-log-datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';


const  fsLogRepository = new LogRepositoryImpl(
    // new PostgresLogDataSource()
    new FileSystemDataSource()
    // new MongoLogDataSource()
);

const  mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDataSource()
);
const  postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDataSource()
);

const emailService = new EmailService();

export class Server {

    public static async start() {
        console.log('Server started...');

        // TODO: Mandar Email
        // new SendEmailLogs(
        //     emailService, 
        //     fileSystemLogRepository,
        //     ).execute(['cepedabrian99@gmail.com',]);
       
        // emailService.sendEmailWithFileSystemLogs(
        //     ['cepedabrian99@gmail.com',]
        // )
    
        //  const logs = await logRepository.getLogs(LogSeverityLevel.low);
        //  console.log(logs)
        // CronService.createJob(
        //     '*/5 * * * * *', 
        //     ()=>{
        //         const url = 'https://google.com'
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             ()=>console.log(`${url} is ok`),
        //             (error)=>console.log(error),
        //            ).execute(url);
                   
        //         // new CheckService().execute(' http://localhost:3000/posts');

        //     }
        // );
 
    
    };

}