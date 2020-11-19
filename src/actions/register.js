import { message } from 'antd';
import * as api from '../api/register';

export function getCaptcha(payload={}) {
    return async () => {
        const { data: {code, message: msg, data: { captcha } = {}}} = await api.getCaptcha(payload);
        if (code === 20020) {
            message.success(`${msg}, the captcha is ${captcha}`)
        } else {
            message.error(msg);
        }
    }
}