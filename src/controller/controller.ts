import { FastifyInstance } from 'fastify'

import { userGuard } from '../guards/user.guard'
import { PartnersDto } from './dto/partners.dto'
import { sendMessage } from '../bot/bot'
import { BotEnum } from '../bot/enums/bot.enum'
import { FeedbackSwaggerSchema } from './schemas/swagger-feedback.schema'
import { PartnersSwaggerSchema } from './schemas/swagger-partners.schema'
import { Headers, Body } from './interfaces'
import { TokenHeaderDto } from './dto/token-header.dto'
import { FeedbackDto } from './dto/feedback.dto'
import { ModificationSwaggerSchema } from './schemas/swagger-modification.schema'
import { SparePartsDto } from './dto/spare-parts.dto'
import { SparePartsSwaggerSchema } from './schemas/swagger-spare-parts.schema'
import { CarOrderSwaggerSchema } from './schemas/swagger-car-order.schema'

export const contorller = (server: FastifyInstance, _, done): void => {
  server.post<Headers<TokenHeaderDto> & Body<PartnersDto>>(
    '/partner',
    { schema: PartnersSwaggerSchema, preValidation: userGuard },
    async (req, res) => {
      const {
        body,
        headers: { token },
      } = req
      await sendMessage(token, body, BotEnum.PARTNERS_BOT)
      res.status(200).send()
    },
  )

  server.post<Headers<TokenHeaderDto> & Body<FeedbackDto>>(
    '/feedback',
    { schema: FeedbackSwaggerSchema, preValidation: userGuard },
    async (req, res) => {
      const {
        body,
        headers: { token },
      } = req
      await sendMessage(token, body, BotEnum.FEEDBACK_BOT)
      res.status(200).send()
    },
  )

  server.post<Headers<TokenHeaderDto> & Body<FeedbackDto>>(
    '/modification',
    { schema: ModificationSwaggerSchema, preValidation: userGuard },
    async (req, res) => {
      const {
        body,
        headers: { token },
      } = req
      await sendMessage(token, body, BotEnum.ADD_MODIFICATION_BOT)
      res.status(200).send()
    },
  )

  server.post<Headers<TokenHeaderDto> & Body<SparePartsDto>>(
    '/spare-parts',
    { schema: SparePartsSwaggerSchema, preValidation: userGuard },
    async (req, res) => {
      const {
        body,
        headers: { token },
      } = req
      await sendMessage(token, body, BotEnum.SPARE_PARTS_BOT)
      res.status(200).send()
    },
  )

  server.post<Headers<TokenHeaderDto> & Body<SparePartsDto>>(
    '/car-order',
    { schema: CarOrderSwaggerSchema, preValidation: userGuard },
    async (req, res) => {
      const {
        body,
        headers: { token },
      } = req
      await sendMessage(token, body, BotEnum.CAR_ORDER_BOT)
      res.status(200).send()
    },
  )

  done()
}
