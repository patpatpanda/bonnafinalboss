import type { CollectionConfig } from 'payload'

export const Locations: CollectionConfig = {
  slug: 'locations',

  labels: {
    singular: 'Plats',
    plural: 'Platser',
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'active'],
  },

  fields: [
    {
      name: 'name',
      label: 'Namn',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL-namn',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'Exempel: ladan eller saloonen. Använd små bokstäver och inga mellanslag.',
      },
    },
    {
      name: 'active',
      label: 'Visa platsen på hemsidan',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'shortDescription',
      label: 'Kort beskrivning',
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      label: 'Längre beskrivning',
      type: 'richText',
    },
    {
      name: 'heroImage',
      label: 'Huvudbild',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      label: 'Bildgalleri',
      type: 'array',
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
      name: 'address',
      label: 'Adress',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Telefon',
      type: 'text',
    },
    {
      name: 'email',
      label: 'E-post',
      type: 'email',
    },
    {
      name: 'ctaText',
      label: 'Knapptext',
      type: 'text',
      defaultValue: 'Läs mer',
    },
  ],
}