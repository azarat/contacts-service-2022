import { Document, Schema, model } from 'mongoose'

export interface ModificationDocument extends Document {
  chatId: number
}

export const ModificationSchema = new Schema({
  chatId: {
    type: Number,
    required: true,
    unique: true,
  },
})

export const Modification = model<ModificationDocument>(
  'Modification',
  ModificationSchema,
)
