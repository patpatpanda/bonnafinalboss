import type { CollectionConfig } from 'payload'

export const OpeningHours: CollectionConfig = {
  slug: 'opening-hours',

  labels: {
    singular: 'Öppettid',
    plural: 'Öppettider',
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'location',
      'startDate',
      'endDate',
      'active',
    ],
  },

  fields: [
    {
      name: 'title',
      label: 'Rubrik',
      type: 'text',
      required: true,
      defaultValue: 'Ordinarie öppettider',
      admin: {
        description:
          'Exempel: Ordinarie öppettider, Vecka 35–37 eller Semesterstängt.',
      },
    },

    {
      name: 'location',
      label: 'Plats',
      type: 'relationship',
      relationTo: 'locations',

      // TILLFÄLLIGT FALSE UNDER MIGRERINGEN
      required: false,

      admin: {
        description:
          'Välj om öppettiderna gäller Ladan eller Saloonen.',
      },
    },

    {
      name: 'active',
      label: 'Visa på hemsidan',
      type: 'checkbox',
      defaultValue: true,
    },

    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          label: 'Gäller från',
          type: 'date',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },

        {
          name: 'endDate',
          label: 'Gäller till',
          type: 'date',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
      ],
    },

    {
      name: 'information',
      label: 'Öppettider / information',
      type: 'textarea',

      // TILLFÄLLIGT FALSE UNDER MIGRERINGEN
      required: false,

      admin: {
        description:
          'Skriv fritt. Exempel: "Lördag–söndag 11:00–16:00" eller "Semesterstängt vecka 32–34".',
      },
    },

    {
      name: 'priority',
      label: 'Sorteringsordning',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Högre nummer kan användas för att visa viktigare information först.',
      },
    },
  ],
}