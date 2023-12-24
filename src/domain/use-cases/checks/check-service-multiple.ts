import { error } from "console";
import { LogRepository } from "../../repository/log.repository";
import { LogEntity, LogEntityOptions, LogSeverityLevel } from "../../entities/log.entity";

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}


type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error:string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {


    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}

    private callLogs(log: LogEntity){
        this.logRepository.forEach(logrepository => {
            logrepository.saveLog(log);
        });
    }

    async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Service ${url} Working`,
                origin: 'Check-service'
            }
)
            this.callLogs(log)
            this.successCallback && this.successCallback();
            return true;

        } catch (error) {

           const errorMessage = `${url} is not ok. ${error} `;
       
            const log = new LogEntity({ 
                level: LogSeverityLevel.high,
                message: errorMessage,
                origin: 'Check-service.ts'});
                this.callLogs(log)
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }

    }
}