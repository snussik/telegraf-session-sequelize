# Sequelize session middleware for Telegraf

Sequelize powered simple session middleware for [Telegraf 4.0](https://github.com/telegraf/telegraf) with TypeScript support.

## Installation

```js
$ npm install telegraf-session-sequelize
```

```js
$ yarn add telegraf-session-sequelize
```

## Example

```js
import { Telegraf } from 'telegraf'
import { Sequelize } from 'sequelize'
import { session } from 'telegraf-session-sequelize'

const bot = new Telegraf(process.env.BOT_TOKEN)

const init = async () => {
    const sequelize = await new Sequelize('dbName', 'username', 'pass', {
	    host: 'host',
	    dialect: 'postgres'
    })
	
    bot.use(session(sequelize, { collectionName: 'Sessions' }))
    bot.launch()
}

init()
```

## API

### Options

* `collectionName`: name for MongoDB collection (default: `Sessions`)
* `sessionName`: context property name (default: `session`)
* `sessionKeyFn`: function that generates the session key from the context ([default implementation](https://github.com/alexnzarov/telegraf-session-mongodb/blob/master/src/keys.ts#L10-L16), [legacy deprecated function](https://github.com/alexnzarov/telegraf-session-mongodb/blob/master/src/keys.ts#L21-L31))
