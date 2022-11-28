import { Telegraf } from 'telegraf'
import * as userSdk from '@day-drive/user-sdk/lib/cjs'

import config from '../config/config'
import { BotEnum } from './enums/bot.enum'
import DatabaseRepository from './db.repository'
import { SchemaEnum } from './enums/schemas.enum'

export const runBot = async (type: BotEnum): Promise<void> => {
  const { token, password, repository } = {
    PARTNERS_BOT: {
      token: config.botPartnersToken,
      password: config.botPartnersPassword,
      repository: new DatabaseRepository(SchemaEnum.PARTNER),
    },
    FEEDBACK_BOT: {
      token: config.botFeedbackToken,
      password: config.botFeedbackPassword,
      repository: new DatabaseRepository(SchemaEnum.FEEDBACK),
    },
    ADD_MODIFICATION_BOT: {
      token: config.botModificationToken,
      password: config.botModificationPassword,
      repository: new DatabaseRepository(SchemaEnum.MODIFICATION),
    },
    SPARE_PARTS_BOT: {
      token: config.botSparePartsToken,
      password: config.botSparePartsPassword,
      repository: new DatabaseRepository(SchemaEnum.SPARE_PARTS),
    },
    CAR_ORDER_BOT: {
      token: config.botCarOrderToken,
      password: config.botCarOrderPassword,
      repository: new DatabaseRepository(SchemaEnum.CAR_ORDER),
    },
  }[type]

  const bot = new Telegraf(token)
  bot.start((ctx) => {
    ctx.reply('Приветствую. Введите пароль')
  })

  bot.command(`/${password}`, async (ctx) => {
    await repository.createRecord(ctx.chat.id)
    ctx.reply('Успешно авторизировались')
  })

  bot.launch()
}

export const sendMessage = async (
  jwt: string,
  body,
  type: BotEnum,
): Promise<void> => {
  const { id } = await userSdk.verifyUser(
    config.userSdkUrl,
    config.userSdkSecret,
    jwt,
  )
  const { token, repository, channel, message } = {
    PARTNERS_BOT: {
      // token: config.botPartnersToken,
      token: config.botToken,
      channel: "@daydrivecontacts_partners",
      repository: new DatabaseRepository(SchemaEnum.PARTNER),
      message: `User: ${id}\nИмя: ${body.name}\nСпециализация бизнесы: ${body.businessSpecialization}\nТелефон: ${body.phone}\nГород: ${body.city}\n`,
    },
    FEEDBACK_BOT: {
      // token: config.botFeedbackToken,
      token: config.botToken,
      channel: "@daydrivecontacts_feedback",
      repository: new DatabaseRepository(SchemaEnum.FEEDBACK),
      message: `User: ${id};\nНомер телефона: ${body.phone};\nНомер машины: ${body.number};\nВремя: ${body.time};\nДата: ${body.date};\nКомментарий: ${body.comment};\nТип: ${body.type};\nНазвание: ${body.service};`,
    },
    ADD_MODIFICATION_BOT: {
      // token: config.botModificationToken,
      token: config.botToken,
      channel: "@daydrivecontacts_addmodification",
      repository: new DatabaseRepository(SchemaEnum.MODIFICATION),
      message: `User: ${id}\nГод: ${body.year}\nМарка: ${body.mark}\nМодель: ${body.model}\nТип модели: ${body.modelType}\nМодификация: ${body.modification}`,
    },
    SPARE_PARTS_BOT: {
      // token: config.botSparePartsToken,
      token: config.botToken,
      channel: "@daydrivecontacts_spareparts",
      repository: new DatabaseRepository(SchemaEnum.SPARE_PARTS),
      message: `User: ${id}\nИмя: ${body.name}\nТелефон: ${body.phone}\nМарка: ${body.car?.mark}\nМодель: ${body.car?.model}\nГод: ${body.car?.year}\nVIN: ${body.vin}\nКомментарий: ${body.comment}`,
    },
    CAR_ORDER_BOT: {
      // token: config.botCarOrderToken,
      token: config.botToken,
      channel: "@daydrivecontacts_carorder",
      repository: new DatabaseRepository(SchemaEnum.CAR_ORDER),
      message: `User: ${id}\nПартнер: ${body.partner}\nИмя: ${body.name}\nТелефон: ${body.phone}\nГод: ${body.carYear}\nАвтомобиль: ${body.car}\nБюджет: ${body.budjet}\nСвязь через: ${body.contactWay}`,
    },
  }[type]
  const bot = new Telegraf(token)
  const chatIds = await repository.getChatIds()
  await Promise.all(
    chatIds.map(async (chatId) => {
      try {
        await bot.telegram.sendMessage(chatId, message)
      } catch (error) {}
    }),
  )

  await bot.telegram.sendMessage(channel, message)
}
