import { Document, Schema, model } from 'mongoose'

export interface CarOrderDocument extends Document {
  chatId: number
}

export const CarOrderSchema = new Schema({
  chatId: {
    type: Number,
    required: true,
    unique: true,
  },
})

export const CarOrder = model<CarOrderDocument>(
  'CarOrder',
  CarOrderSchema,
)
