import type { CollectionConfig } from 'payload'

export const BookingExceptions: CollectionConfig = {
  slug: 'booking-exceptions',

  labels: {
    singular: 'Bokningsundantag',
    plural: 'Bokningsundantag',
  },

  admin: {
    useAsTitle: 'reason',
    defaultColumns: ['date', 'type', 'reason'],
  },

  fields: [
    {
      name: 'date',
      label: 'Datum',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'type',
      label: 'Typ av undantag',
      type: 'select',
      required: true,
      defaultValue: 'full-day',
      options: [
        {
          label: 'Stängt hela dagen',
          value: 'full-day',
        },
        {
          label: 'Blockera vissa tider',
          value: 'specific-times',
        },
      ],
    },
    {
      name: 'blockedTimes',
      label: 'Blockerade tider',
      type: 'select',
      hasMany: true,
      options: [
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
      ],
      admin: {
        condition: (_, siblingData) =>
          siblingData?.type === 'specific-times',
      },
    },
    {
      name: 'reason',
      label: 'Anledning',
      type: 'text',
      required: true,
    },
  ],
}