import { Document, Model as MongooseModel, Schema } from 'mongoose';

import { DATABASE } from '../utils/constants';
import { getConnectionToDatabase } from '../config/mongo';
import { LogTypeEnum } from '../types/enums/logsEnums';

export const LogsSchema: Schema = new Schema(
    {
        topic: { type: String, required: true },
        message: { type: String, required: true }
    },
    { timestamps: true, collection: 'logs' }
);

export type Logs = { topic: LogTypeEnum; message: string };
export type ILogs = Logs & Document;

/** Define CRUD Interfaces */
let Model: MongooseModel<ILogs>;
export const getLogsModel = async (): Promise<MongooseModel<ILogs>> => {
    const conn = await getConnectionToDatabase(DATABASE);
    if (conn) {
        if (!Model) {
            console.log('Init new LogsModel ... ');
            Model = await conn.model<ILogs>('LogsModel', LogsSchema);
        }
        return Model;
    }
    throw Error('Unable to get');
};
