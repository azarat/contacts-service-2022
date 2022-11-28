import fastify from 'fastify'
import swagger from 'fastify-swagger'
import mongoose from 'mongoose'

import config from './config/config'
import HttpError from './errors/HttpError'
import { contorller } from './controller/controller'
import { runBot } from './bot/bot'
import { BotEnum } from './bot/enums/bot.enum'

const app = fastify({
  logger: true,
})

app.get('/health', async () => 'Hello World')
app.register(swagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    host: config.apiHost,
    info: {
      title: 'Contacts service API',
      version: 'v1',
    },
  },
})
app.register(contorller)

app.setErrorHandler((err, _, res) => {
  if (err instanceof HttpError) {
    res.status(err.code).send(err.message)
  } else {
    res.status(500).send(err.message)
  }
})

const start = async (): Promise<void> => {
  try {
    await config.init()
    await mongoose.connect(config.mongoUri)
    await app.listen(config.port, '0.0.0.0')
    // await runBot(BotEnum.PARTNERS_BOT)
    // await runBot(BotEnum.FEEDBACK_BOT)
    // await runBot(BotEnum.ADD_MODIFICATION_BOT)
    // await runBot(BotEnum.SPARE_PARTS_BOT)
    // await runBot(BotEnum.CAR_ORDER_BOT)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()

export default app
