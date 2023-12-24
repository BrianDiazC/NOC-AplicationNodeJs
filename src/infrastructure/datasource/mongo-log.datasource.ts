import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogModel } from '../../data/mongo/models/log.model';



export class MongoLogDataSource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const newLog = await LogModel.create(log);
        // await newLog.Save(); con el de arriba es suficiente
        console.log('Mongo Log created:', newLog.id)

    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        });

        // return logs.map(mongolog=> LogEntity.fromObject(mongolog))
        return logs.map( LogEntity.fromObject) //Lo mismo que arriba
    }


}