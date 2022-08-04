export const PartnersSwaggerSchema = {
  tags: ['Contacts'],
  headers: {
    token: {
      type: 'string',
    },
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      businessSpecialization: { type: 'string' },
      phone: { type: 'string' },
      city: { type: 'string' },
    },
  },
}
