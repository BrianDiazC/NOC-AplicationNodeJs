import { PrismaClient, SevetityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEnum = {
    low: SevetityLevel.LOW,
    medium: SevetityLevel.MEDIUM,
    high: SevetityLevel.HIGH
}

export class PostgresLogDataSource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];

        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level: level,
            },
        });
        console.log('Postgres saved');

    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const level = severityEnum[severityLevel];

        const dbLogs = await prisma.logModel.findMany({

            where: {
                level: level
            }
        })

        console.log(dbLogs);

        return dbLogs.map(dbLog => LogEntity.fromObject(dbLog))

    }

}
