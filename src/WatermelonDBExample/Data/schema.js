import { appSchema, tableSchema } from '@nozbe/watermelondb';

// Created app schema
export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'notes',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'content', type: 'string' },
        { name: 'is_pinned', type: 'boolean' },
      ],
    }),
  ],
});
