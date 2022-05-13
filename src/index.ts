import {Sequelize} from "sequelize";
import { Context, MiddlewareFn } from 'telegraf';
import { getSessionKey, SessionKeyFunction } from './keys';
import { getSessionTable, ModelSettings } from './model'



export type SessionOptions = {
    sessionName: string;
    collectionName: string;
    sessionKeyFn: SessionKeyFunction;
};

export const session = <C extends Context = Context>(sequelize:Sequelize, sessionOptions?: Partial<SessionOptions>): MiddlewareFn<C> => {
    const options: SessionOptions = {
        sessionName: 'session',
        collectionName: 'Sessions',
        sessionKeyFn: getSessionKey,
        ...sessionOptions
    };

    const collection = getSessionTable(sequelize, { tableName: options.collectionName} )

    const saveSession = (key: string, data: any) =>
        collection.upsert({
            sessionID: key,
            data: JSON.stringify(data)
        })
    const getSession = async (key: string) => {
        try {
            const data = await collection.findByPk(key, { rejectOnEmpty: true })
            return JSON.parse(data.data)
        } catch (e) {
            return {}
        }
    }

    const { sessionKeyFn: getKey, sessionName } = options;

    return async (ctx: Context, next) => {
        const key = getKey(ctx);
        const data = key == null ? undefined : await getSession(key);

        ctx[sessionName] = data;

        await next();

        if (ctx[sessionName] != null) {
            await saveSession(key, ctx[sessionName]);
        }
    };
}