import { Document, Schema, model } from 'mongoose'

export interface FeedbackDocument extends Document {
  chatId: number
}

export const FeedbackSchema = new Schema({
  chatId: {
    type: Number,
    required: true,
    unique: true,
  },
})

export const Feedback = model<FeedbackDocument>('Feedback', FeedbackSchema)
