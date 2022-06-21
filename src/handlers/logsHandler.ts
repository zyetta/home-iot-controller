import { anyToString } from '../utils/utils';
import { ConsoleColorsEnum } from '../types/enums/generalEnums';
import { Logs } from '../models/logsModel';
import { LogsController } from '../controllers/logsController';
import { LogsInputSchema } from '../validation/logsValidation';
// eslint-disable-next-line import/order
import { ValidationOptions } from 'joi';

export class LogsHandler {
    /**
     * Validation options of mqtt handler
     */
    private static validationOptions: ValidationOptions = { abortEarly: false, errors: { wrap: { label: "'" } } };

    static log(data: Logs) {
        const logs = { topic: data.topic, message: anyToString(data.message) };
        const { value, error } = LogsInputSchema.validate(logs, this.validationOptions);
        if (error) throw error;
        LogsController.storeLogs(value);
        console.log(ConsoleColorsEnum.FG_RED, value);
    }
}
