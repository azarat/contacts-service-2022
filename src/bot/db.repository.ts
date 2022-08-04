import { Model } from 'mongoose'

import { Feedback } from './schemas/feedback.schema'
import { Modification } from './schemas/modification.schema'
import { Partner } from './schemas/partner.schema'
import { SchemaEnum } from './enums/schemas.enum'
import { SpareParts } from './schemas/spare-parts.schema'
import { CarOrder } from './schemas/car-order.schema'

class DatabaseRepository {
  ModelDb: Model<any, any, any, any>

  constructor(model: SchemaEnum) {
    this.ModelDb = {
      PARTNER: Partner,
      FEEDBACK: Feedback,
      MODIFICATION: Modification,
      SPARE_PARTS: SpareParts,
      CAR_ORDER: CarOrder,
    }[model]
  }
  public async createRecord(chatId: number): Promise<void> {
    const record = await this.ModelDb.findOne({ chatId })
    if (!record) {
      await this.ModelDb.create({ chatId })
    }
  }

  public async getChatIds(): Promise<number[]> {
    const records = await this.ModelDb.find()
    return records.map(({ chatId }) => chatId)
  }
}

export default DatabaseRepository
