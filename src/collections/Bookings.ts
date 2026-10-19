
import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',

  labels: {
    singular: 'Bokning',
    plural: 'Bokningar',
  },

  // =========================
  // ADMIN
  // =========================
  admin: {
    useAsTitle: 'name',

    defaultColumns: [
      'date',
      'time',
      'name',
      'guests',
      'durationMinutes',
      'status',
    ],
  },

  // =========================
  // FÄLT
  // =========================
  fields: [
    // =========================
    // NAMN
    // =========================
    {
      name: 'name',
      label: 'Namn',
      type: 'text',
      required: true,
    },

    // =========================
    // E-POST
    // =========================
    {
      name: 'email',
      label: 'E-post',
      type: 'email',
      required: true,
    },

    // =========================
    // TELEFONNUMMER
    // =========================
    {
      name: 'phone',
      label: 'Telefonnummer',
      type: 'text',
      required: true,
    },

    // =========================
    // DATUM
    // =========================
    {
      name: 'date',
      label: 'Datum',
      type: 'date',
      required: true,

      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },

    // =========================
    // BOKNINGSTID
    // =========================
    {
      name: 'time',
      label: 'Tid',
      type: 'text',
      required: true,
    },

    // =========================
    // ANTAL PERSONER
    // =========================
    {
      name: 'guests',
      label: 'Antal personer',
      type: 'number',
      required: true,
      min: 1,
    },

    // =========================
    // BOKNINGSLÄNGD
    // =========================
    {
      name: 'durationMinutes',
      label: 'Bokningslängd',
      type: 'number',
      required: true,
      defaultValue: 90,
      min: 30,

      admin: {
        description:
          'Hur många minuter bordet är reserverat för den här bokningen.',
      },
    },

    // =========================
    // MEDDELANDE
    // =========================
    {
      name: 'message',
      label: 'Meddelande',
      type: 'textarea',
    },

    // =========================
    // STATUS
    // =========================
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
