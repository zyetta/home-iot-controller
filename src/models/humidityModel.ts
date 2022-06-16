import { Document, Model as MongooseModel, Schema } from 'mongoose';

import { DATABASE } from '../utils/constants';
import { getConnectionToDatabase } from '../config/mongo';

export const HumiditySchema: Schema = new Schema(
    {
        deviceId: { type: String, required: true },
        value: { type: Number, required: true },
        exported: { type: Boolean, required: true, default: false }
    },
    { timestamps: true, collection: 'humidity' }
);

export type Humidity = { value: number; deviceId: string };
export type IHumidity = Humidity & Document;

/** Define CRUD Interfaces */
let Model: MongooseModel<IHumidity>;
export const getHumidityModel = async (): Promise<MongooseModel<IHumidity>> => {
    const conn = await getConnectionToDatabase(DATABASE);
    if (conn) {
        if (!Model) {
            console.log('Init new HumidityModel ... ');
            Model = await conn.model<IHumidity>('HumidityModel', HumiditySchema);
        }
        return Model;
    }
    throw Error('Unable to get');
};
