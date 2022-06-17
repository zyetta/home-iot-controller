import { Document, Model as MongooseModel, Schema } from 'mongoose';

import { DATABASE } from '../utils/constants';
import { getConnectionToDatabase } from '../config/mongo';

export const SwitchSchema: Schema = new Schema(
    {
        deviceId: { type: String, required: true },
        value: { type: Number, required: true },
        exported: { type: Boolean, required: true, default: false }
    },
    { timestamps: true, collection: 'switch' }
);

export type Switch = { value: 0 | 1; deviceId: string };
export type ISwitch = Switch & Document & { createdAt?: Date; updatedAt?: Date };

/** Define CRUD Interfaces */
let Model: MongooseModel<ISwitch>;
export const getSwitchModel = async (): Promise<MongooseModel<ISwitch>> => {
    const conn = await getConnectionToDatabase(DATABASE);
    if (conn) {
        if (!Model) {
            console.log('Init new SwitchModel ... ');
            Model = await conn.model<ISwitch>('SwitchModel', SwitchSchema);
        }
        return Model;
    }
    throw Error('Unable to get');
};
