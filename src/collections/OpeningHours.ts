
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
      'active',
      'startDate',
      'endDate',
    ],
    description:
      'Hantera öppettider och säsongsinformation för Bonnatösens olika platser.',
  },

  fields: [
    {
      type: 'tabs',

      tabs: [
        // =================================
        // FLIK 1: GRUNDINSTÄLLNINGAR
        // =================================

        {
          label: 'Grundinställningar',

          fields: [
            {
              name: 'title',
              label: 'Rubrik',
              type: 'text',
              required: true,
              defaultValue: 'Ordinarie öppettider',
              admin: {
                description:
                  'Namnet på denna öppettidsperiod.',
              },
            },

            {
              name: 'location',
              label: 'Plats',
              type: 'relationship',
              relationTo: 'locations',
              required: false,
              admin: {
                description:
                  'Välj vilken plats informationen gäller.',
              },
            },

            {
              name: 'active',
              label: 'Visa på hemsidan',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description:
                  'Avaktivera för att tillfälligt dölja informationen på hemsidan.',
              },
            },

            {
              name: 'priority',
              label: 'Sorteringsordning',
              type: 'number',
              defaultValue: 0,
              admin: {
                description:
                  'Använd högre nummer för att prioritera information.',
              },
            },
          ],
        },

        // =================================
        // FLIK 2: ÖPPETTIDER
        // =================================

        {
          label: 'Öppettider',

          fields: [
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
              required: false,

              admin: {
                rows: 6,

                description:
                  'Ange öppettider. Skriv en rad per dag eller information. Exempel:\nTorsdag 10:30–15:00\nFredag 10:30–20:00\nLördag 11:00–20:00',

                condition: (data, siblingData) =>
                  siblingData?.seasonClosed !== true,
              },
            },
          ],
        },

        // =================================
        // FLIK 3: SÄSONGSINSTÄLLNINGAR
        // =================================

        {
          label: 'Säsong',

          fields: [
            {
              name: 'seasonClosed',
              label: 'Säsongsstängt',
              type: 'checkbox',
              defaultValue: false,

              admin: {
                description:
                  'Aktivera om platsen är stängd för säsongen. Då visas ett särskilt meddelande istället för vanliga öppettider.',
              },
            },

            {
              name: 'seasonMessage',
              label: 'Meddelande',
              type: 'text',
              required: false,

              admin: {
                placeholder:
                  'Tack för säsongen – vi ses igen!',

                description:
                  'Huvudmeddelandet som visas på hemsidan.',

                condition: (data, siblingData) =>
                  siblingData?.seasonClosed === true,
              },
            },

            {
              name: 'reopeningText',
              label: 'Öppnar igen',

              type: 'text',
              required: false,

              admin: {
                placeholder: 'Våren 2027',

                description:
                  'Ange när verksamheten öppnar igen. Exempelvis Våren 2027 eller 1 maj 2027.',

                condition: (data, siblingData) =>
                  siblingData?.seasonClosed === true,
              },
            },
          ],
        },
      ],
    },
  ],
}
