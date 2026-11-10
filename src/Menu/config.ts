
import type { GlobalConfig } from 'payload'

const productFields = [
  {
    name: 'name',
    label: 'Namn',
    type: 'text' as const,
    required: true,
  },
  {
    name: 'description',
    label: 'Beskrivning',
    type: 'textarea' as const,
  },
  {
    name: 'price',
    label: 'Pris (kr)',
    type: 'number' as const,
    min: 0,
    required: true,
  },
  {
    name: 'active',
    label: 'Visa på menyn',
    type: 'checkbox' as const,
    defaultValue: true,
  },
]

export const Menu: GlobalConfig = {
  slug: 'menu',
  label: 'Meny',

  fields: [
    {
      type: 'tabs',

      tabs: [
        // =========================
        // INTRODUKTION
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
              name: 'singleBurgerPrice',
              label: 'Pris enkel',
              type: 'number',
              min: 0,
              required: true,
              defaultValue: 135,
            },
            {
              name: 'doubleBurgerPrice',
              label: 'Pris dubbel',
              type: 'number',
              min: 0,
              required: true,
              defaultValue: 165,
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
        // EGNA KATEGORIER
        // =========================
        {
          label: 'Egna kategorier',
          description:
            'Skapa kategorier som Korv, Tillbehör, Dessert, Fatöl eller något helt nytt. Dra för att ändra ordning.',

          fields: [
            {
              name: 'categories',
              label: 'Meny-kategorier',
              type: 'array',

              labels: {
                singular: 'Kategori',
                plural: 'Kategorier',
              },

              admin: {
                description:
                  'Lägg till kategorier och sortera dem med dra och släpp. Nya kategorier visas tillsammans med befintliga kategorier under övergången.',
              },

              fields: [
                {
                  name: 'name',
                  label: 'Kategorinamn',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  label: 'Text under rubriken',
                  type: 'textarea',
                },
                {
                  name: 'active',
                  label: 'Visa kategorin',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'items',
                  label: 'Produkter',
                  type: 'array',

                  labels: {
                    singular: 'Produkt',
                    plural: 'Produkter',
                  },

                  admin: {
                    description:
                      'Lägg till produkter och dra dem i önskad ordning.',
                  },

                  fields: productFields,
                },
              ],
            },
          ],
        },

        // =========================
        // TILLBEHÖR (ÄLDRE)
        // =========================
        // Behålls för befintliga produkter.
        {
          label: 'Tillbehör (äldre)',

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
              fields: productFields,
            },
          ],
        },

        // =========================
        // DESSERT (ÄLDRE)
        // =========================
        {
          label: 'Dessert (äldre)',

          fields: [
            {
              name: 'dessertsTitle',
              label: 'Rubrik',
              type: 'text',
              defaultValue: 'Dessert',
            },
            {
              name: 'dessertsText',
              label: 'Text under rubriken',
              type: 'textarea',
            },
            {
              name: 'desserts',
              label: 'Desserter',
              type: 'array',
              fields: productFields,
            },
          ],
        },

        // =========================
        // DRYCK (ÄLDRE)
        // =========================
        {
          label: 'Dryck (äldre)',

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
                  name: 'category',
                  label: 'Kategori',
                  type: 'select',
                  required: true,
                  defaultValue: 'soft-drinks',

                  options: [
                    {
                      label: 'Öl',
                      value: 'beer',
                    },
                    {
                      label: 'Fatöl',
                      value: 'draft-beer',
                    },
                    {
                      label: 'Öl på burk',
                      value: 'canned-beer',
                    },
                    {
                      label: 'Vin',
                      value: 'wine',
                    },
                    {
                      label: 'Alkoholfritt',
                      value: 'alcohol-free',
                    },
                    {
                      label: 'Läsk',
                      value: 'soft-drinks',
                    },
                    {
                      label: 'Övrigt',
                      value: 'other',
                    },
                  ],
                },

                ...productFields,
              ],
            },
          ],
        },

        // =========================
        // BILDGALLERI
        // =========================
        {
          label: 'Bildgalleri',

          fields: [
            {
              name: 'gallery',
              label: 'Bilder',
              type: 'array',

              labels: {
                singular: 'Bild',
                plural: 'Bilder',
              },

              admin: {
                description:
                  'Lägg till bilder och dra dem i önskad ordning.',
              },

              fields: [
                {
                  name: 'image',
                  label: 'Bild',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  label: 'Bildtext (valfri)',
                  type: 'text',
                },
                {
                  name: 'active',
                  label: 'Visa bilden på hemsidan',
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
