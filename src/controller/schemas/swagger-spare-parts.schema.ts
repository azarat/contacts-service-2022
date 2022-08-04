export const SparePartsSwaggerSchema = {
  tags: ['Car'],
  headers: {
    token: {
      type: 'string',
    },
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      phone: { type: 'string' },
      car: {
        type: 'object',
        properties: {
          mark: { type: 'string' },
          model: { type: 'string' },
          year: { type: 'number' },
        },
      },
      vin: { type: 'string' },
      comment: { type: 'string' },
    },
  },
}
