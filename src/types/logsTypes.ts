import { LogTypeEnum } from './enums/logsEnums';

export type Logs = {
    topic: LogTypeEnum;
    message: any;
};
