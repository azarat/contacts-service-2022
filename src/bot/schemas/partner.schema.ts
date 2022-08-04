import { Document, Schema, model } from 'mongoose'

export interface PartnerDocument extends Document {
  chatId: number
}

export const PartnerSchema = new Schema({
  chatId: {
    type: Number,
    required: true,
    unique: true,
  },
})

export const Partner = model<PartnerDocument>('Partner', PartnerSchema)
