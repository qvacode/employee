import { Env } from "./env.config";

export const mailConfig = {
    host: Env.MAIL_SERVER_HOST,
    port: Env.MAIL_SERVER_PORT,
    secure: false,
    auth: {
        user: Env.MAIL_USER,
        pass: Env.MAIL_PASSWORD,
    },
}