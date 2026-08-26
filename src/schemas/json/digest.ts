export const ENTRIES_SCHEMA = {
  type: 'object',
  properties: {
    entries: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          summary: { type: 'string' },
          topic: { type: 'string' },
          links: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                url: { type: 'string' },
                kind: { type: 'string', enum: ['article', 'video'] },
              },
              required: ['label', 'url', 'kind'],
              additionalProperties: false,
            },
          },
          buildIdea: { type: ['string', 'null'] },
        },
        required: ['title', 'summary', 'topic', 'links', 'buildIdea'],
        additionalProperties: false,
      },
    },
  },
  required: ['entries'],
  additionalProperties: false,
} as const;
