export const ModificationSwaggerSchema = {
  tags: ['Car'],
  headers: {
    token: {
      type: 'string',
    },
  },
  body: {
    type: 'object',
    properties: {
      year: { type: 'number' },
      mark: { type: 'string' },
      model: { type: 'string' },
      modelType: { type: 'string' },
      modification: { type: 'string' },
    },
  },
}
