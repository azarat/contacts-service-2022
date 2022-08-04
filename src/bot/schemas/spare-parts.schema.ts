import { Document, Schema, model } from 'mongoose'

export interface SparePartsDocument extends Document {
  chatId: number
}

export const SparePartsSchema = new Schema({
  chatId: {
    type: Number,
    required: true,
    unique: true,
  },
})

export const SpareParts = model<SparePartsDocument>(
  'SpareParts',
  SparePartsSchema,
)
