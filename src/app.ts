import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/env.plugins";
import { MongpDatabase } from "./data/mongo/init";
import { LogModel } from "./data/mongo/models/log.model";
import { Server } from "./presetantion/server"


( async ()=>{
    await main()
})();

//Inicia la Aplicacion
async function main() {
   
    await MongpDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });



    Server.start();











    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //        level: 'HIGH',
    //        message: 'Test message',
    //        origin: 'App.ts' 
    //     }
    // });

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH'
    //     }
    // });
    // console.log(logs)


}


    // Crear una coleccion = tables, documento = registro
    // const newLog = await LogModel.create({
    //     message: 'test message desde Mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // });

    // await newLog.save();

    // console.log(newLog)

    // const logs = await LogModel.find()
    // console.log(logs[4].message)