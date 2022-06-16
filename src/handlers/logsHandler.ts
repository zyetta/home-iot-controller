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

    static log(errors: Logs) {
        const { value, error } = LogsInputSchema.validate(errors, this.validationOptions);
        if (error) throw error;
        LogsController.storeLogs(value);
    }
}
