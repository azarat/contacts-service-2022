export const FeedbackSwaggerSchema = {
  tags: ['Contacts'],
  headers: {
    token: {
      type: 'string',
    },
  },
  body: {
    type: 'object',
    properties: {
      service: { type: 'string' },
      phone: { type: 'string' },
      number: { type: 'string' },
      time: { type: 'string' },
      date: { type: 'string' },
      type: { type: 'string' },
      comment: { type: 'string' },
    },
  },
}
