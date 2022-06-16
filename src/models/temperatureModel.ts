import { Document, Model as MongooseModel, Schema } from 'mongoose';

import { DATABASE } from '../utils/constants';
import { getConnectionToDatabase } from '../config/mongo';

export const TemperatureSchema: Schema = new Schema(
    {
        deviceId: { type: String, required: true },
        value: { type: Number, required: true }
    },
    { timestamps: true, collection: 'temperature' }
);

export type Temperature = { value: number; deviceId: string };
export type ITemperature = Temperature & Document;

/** Define CRUD Interfaces */
let Model: MongooseModel<ITemperature>;
export const getTemperatureModel = async (): Promise<MongooseModel<ITemperature>> => {
    const conn = await getConnectionToDatabase(DATABASE);
    if (conn) {
        if (!Model) {
            console.log('Init new TemperatureModel ... ');
            Model = await conn.model<ITemperature>('TemperatureModel', TemperatureSchema);
        }
        return Model;
    }
    throw Error('Unable to get');
};
