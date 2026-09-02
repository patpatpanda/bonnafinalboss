import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',

  labels: {
    singular: 'Produkt',
    plural: 'Produkter',
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'name',
      'price',
      'active',
      'featured',
      'updatedAt',
    ],
  },

  fields: [
    {
      name: 'name',
      label: 'Produktnamn',
      type: 'text',
      required: true,
    },

    slugField(),

    {
      name: 'shortDescription',
      label: 'Kort beskrivning',
      type: 'textarea',
      admin: {
        description:
          'Kort text som visas på produktkortet i shoppen.',
      },
    },

    {
      name: 'description',
      label: 'Produktbeskrivning',
      type: 'richText',
    },

    {
      name: 'price',
      label: 'Pris',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Pris i svenska kronor.',
      },
    },

    {
      name: 'images',
      label: 'Produktbilder',
      type: 'array',
      minRows: 1,

      fields: [
        {
          name: 'image',
          label: 'Bild',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    {
      name: 'hasSizes',
      label: 'Produkten har storlekar',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'sizes',
      label: 'Storlekar',
      type: 'array',

      admin: {
        condition: (_, siblingData) =>
          Boolean(siblingData?.hasSizes),
        description:
          'Lägg till de storlekar som går att köpa.',
      },

      fields: [
        {
          name: 'size',
          label: 'Storlek',
          type: 'text',
          required: true,
          admin: {
            description: 'Exempel: S, M, L, XL.',
          },
        },

        {
          name: 'stock',
          label: 'Lagersaldo',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
        },
      ],
    },

    {
      name: 'stock',
      label: 'Lagersaldo',
      type: 'number',
      defaultValue: 0,
      min: 0,

      admin: {
        condition: (_, siblingData) =>
          !siblingData?.hasSizes,
        description:
          'Används för produkter som inte har olika storlekar.',
      },
    },

    {
      name: 'featured',
      label: 'Utvald produkt',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Kan användas för att lyfta produkten extra på shop-sidan.',
      },
    },

    {
      name: 'active',
      label: 'Visa i shoppen',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}