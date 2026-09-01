import type { CollectionConfig } from 'payload'

export const OpeningHours: CollectionConfig = {
  slug: 'opening-hours',

  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Ordinarie öppettider',
      required: true,
    },
    {
      name: 'monday',
      type: 'group',
      fields: [
        {
          name: 'closed',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'open',
          type: 'text',
        },
        {
          name: 'close',
          type: 'text',
        },
      ],
    },
    {
      name: 'tuesday',
      type: 'group',
      fields: [
        {
          name: 'closed',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'open',
          type: 'text',
        },
        {
          name: 'close',
          type: 'text',
        },
      ],
    },
    {
      name: 'wednesday',
      type: 'group',
      fields: [
        { name: 'closed', type: 'checkbox', defaultValue: false },
        { name: 'open', type: 'text' },
        { name: 'close', type: 'text' },
      ],
    },
    {
      name: 'thursday',
      type: 'group',
      fields: [
        { name: 'closed', type: 'checkbox', defaultValue: false },
        { name: 'open', type: 'text' },
        { name: 'close', type: 'text' },
      ],
    },
    {
      name: 'friday',
      type: 'group',
      fields: [
        { name: 'closed', type: 'checkbox', defaultValue: false },
        { name: 'open', type: 'text' },
        { name: 'close', type: 'text' },
      ],
    },
    {
      name: 'saturday',
      type: 'group',
      fields: [
        { name: 'closed', type: 'checkbox', defaultValue: false },
        { name: 'open', type: 'text' },
        { name: 'close', type: 'text' },
      ],
    },
    {
      name: 'sunday',
      type: 'group',
      fields: [
        { name: 'closed', type: 'checkbox', defaultValue: false },
        { name: 'open', type: 'text' },
        { name: 'close', type: 'text' },
      ],
    },
  ],
}