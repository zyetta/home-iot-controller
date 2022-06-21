import { getLogsModel, Logs } from '../models/logsModel';

export class LogsController {
    /**
     * Stores log data into the database
     * @param {Logs} data
     */
    static async storeLogs(data: Logs) {
        const LogsModel = await getLogsModel();
        try {
            await LogsModel.create(data);
            console.log(data);
        } catch (error) {
            throw Error(error);
        }
    }
}
