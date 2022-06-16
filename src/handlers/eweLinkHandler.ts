import { EweLinkController } from '../controllers/eweLinkController';
import { eWeLinkLogin } from '../types/eweLinkTypes';
import { eweLinkLoginInputSchema } from '../validation/eweLinkValidation';
import { LogsHandler } from './logsHandler';
import { LogTypeEnum } from '../types/enums/logsEnums';
// eslint-disable-next-line import/order
import { ValidationOptions } from 'joi';

export class EweLinkHandler {
    /**
     * Validation options of mqtt handler
     */
    private static validationOptions: ValidationOptions = { abortEarly: false, errors: { wrap: { label: "'" } } };

    public static setState(data: eWeLinkLogin) {
        try {
            const { value, error } = eweLinkLoginInputSchema.validate(data, this.validationOptions);
            if (error) throw error;
            EweLinkController.setState(value);
        } catch (error) {
            LogsHandler.log({ topic: LogTypeEnum.VALIDATION_ERROR, message: error });
        }
    }
}
