import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',

  labels: {
    singular: 'Bokning',
    plural: 'Bokningar',
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['date', 'time', 'name', 'guests', 'status'],
  },

  fields: [
    {
      name: 'name',
      label: 'Namn',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'E-post',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Telefonnummer',
      type: 'text',
      required: true,
    },
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
      name: 'time',
      label: 'Tid',
      type: 'text',
      required: true,
    },
    {
      name: 'guests',
      label: 'Antal personer',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'message',
      label: 'Meddelande',
      type: 'textarea',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        {
          label: 'Ny',
          value: 'pending',
        },
        {
          label: 'Bekräftad',
          value: 'confirmed',
        },
        {
          label: 'Avbokad',
          value: 'cancelled',
        },
      ],
    },
  ],
}