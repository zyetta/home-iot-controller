export type eWeLinkLogin = { email: string; password: string; deviceId: string; value: 0 | 1 };

export const eweLinkDeviceState = { 0: 'off', 1: 'on' };

export const EWELINK_DEVICES = [process.env.LIGHT_ID as string, process.env.LAMP_ID as string];
