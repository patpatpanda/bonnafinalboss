import type { GlobalConfig } from 'payload'

export const Menu: GlobalConfig = {
  slug: 'menu',

  label: 'Meny',

  fields: [
    {
      type: 'tabs',

      tabs: [
        // =========================
        // SIDANS INTRO
        // =========================
        {
          label: 'Introduktion',

          fields: [
            {
              name: 'eyebrow',
              label: 'Liten rubrik',
              type: 'text',
              defaultValue: 'Bonnatösens Burgare',
            },
            {
              name: 'title',
              label: 'Rubrik',
              type: 'text',
              defaultValue: 'Menyn',
              required: true,
            },
            {
              name: 'intro',
              label: 'Introduktion',
              type: 'textarea',
              defaultValue:
                'En burgare i taget. Ny burgare varje vecka.',
            },
            {
              name: 'heroImage',
              label: 'Bakgrundsbild',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },

        // =========================
        // VECKANS BURGARE
        // =========================
        {
          label: 'Veckans burgare',

          fields: [
            {
              name: 'burgerActive',
              label: 'Visa veckans burgare',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'burgerEyebrow',
              label: 'Liten rubrik',
              type: 'text',
              defaultValue: 'Veckans burgare',
            },
            {
              name: 'burgerName',
              label: 'Namn',
              type: 'text',
              required: true,
            },
            {
              name: 'burgerDescription',
              label: 'Beskrivning',
              type: 'textarea',
            },
            {
              name: 'burgerPrice',
              label: 'Pris',
              type: 'number',
              min: 0,
              required: true,
            },
            {
              name: 'burgerImage',
              label: 'Bild',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },

        // =========================
        // TILLBEHÖR
        // =========================
        {
          label: 'Tillbehör',

          fields: [
            {
              name: 'sidesTitle',
              label: 'Rubrik',
              type: 'text',
              defaultValue: 'Tillbehör',
            },
            {
              name: 'sides',
              label: 'Tillbehör',
              type: 'array',

              fields: [
                {
                  name: 'name',
                  label: 'Namn',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  label: 'Beskrivning',
                  type: 'textarea',
                },
                {
                  name: 'price',
                  label: 'Pris',
                  type: 'number',
                  min: 0,
                  required: true,
                },
                {
                  name: 'active',
                  label: 'Visa på menyn',
                  type: 'checkbox',
                  defaultValue: true,
                },
              ],
            },
          ],
        },

        // =========================
        // DRYCK
        // =========================
        {
          label: 'Dryck',

          fields: [
            {
              name: 'drinksTitle',
              label: 'Rubrik',
              type: 'text',
              defaultValue: 'Dryck',
            },
            {
              name: 'drinksText',
              label: 'Text under rubriken',
              type: 'textarea',
            },
            {
              name: 'drinks',
              label: 'Drycker',
              type: 'array',

              fields: [
                {
                  name: 'name',
                  label: 'Namn',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  label: 'Beskrivning',
                  type: 'textarea',
                },
                {
                  name: 'price',
                  label: 'Pris',
                  type: 'number',
                  min: 0,
                  required: true,
                },
                {
                  name: 'active',
                  label: 'Visa på menyn',
                  type: 'checkbox',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}