import { Document, Model as MongooseModel, Schema } from 'mongoose';
import { DATABASE } from '../utils/constants';
import { getConnectionToDatabase } from '../config/mongo';

export const StatusSchema: Schema = new Schema(
    {
        deviceId: { type: String, required: true },
        value: { type: Number, required: true },
        exported: { type: Boolean, required: true, default: false }
    },
    { timestamps: true, collection: 'status' }
);

export type Status = { value: number, deviceId: string };
export type IStatus = Status & Document & { createdAt?: Date; updatedAt?: Date };

/** Define CRUD Interfaces */
let Model: MongooseModel<IStatus>;
export const getStatusModel = async (): Promise<MongooseModel<IStatus>> => {
    const conn = await getConnectionToDatabase(DATABASE);
    if (conn) {
        if (!Model) {
            console.log('Init new StatusModel ... ');
            Model = await conn.model<IStatus>('StatusModel', StatusSchema);
        }
        return Model;
    }
    throw Error('Unable to get');
};
