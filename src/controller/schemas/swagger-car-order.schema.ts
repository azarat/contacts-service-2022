export const CarOrderSwaggerSchema = {
  tags: ['Car'],
  headers: {
    token: {
      type: 'string',
    },
  },
  body: {
    type: 'object',
    properties: {
      partner: { type: 'string' },
      name: { type: 'string' },
      phone: { type: 'number' },
      carYear: { type: 'number' },
      car: { type: 'string' },
      budjet: { type: 'number' },
      contactWay: { type: 'string' },
    },
  },
}
