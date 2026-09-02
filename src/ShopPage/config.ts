import type { GlobalConfig } from 'payload'

export const ShopPage: GlobalConfig = {
  slug: 'shop-page',

  label: 'Shop-sida',

  fields: [
    {
      type: 'tabs',

      tabs: [
        {
          label: 'Hero',

          fields: [
            {
              name: 'eyebrow',
              label: 'Liten rubrik',
              type: 'text',
              defaultValue: 'Bonnatösen',
            },

            {
              name: 'title',
              label: 'Rubrik',
              type: 'text',
              required: true,
              defaultValue: 'Shop',
            },

            {
              name: 'intro',
              label: 'Introduktion',
              type: 'textarea',
              defaultValue:
                'Kläder, prylar och annat från Bonnatösen.',
            },

            {
              name: 'heroImage',
              label: 'Hero-bild',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },

        {
          label: 'Produkter',

          fields: [
            {
              name: 'productsEyebrow',
              label: 'Liten rubrik',
              type: 'text',
              defaultValue: 'Bonnatösen Merch',
            },

            {
              name: 'productsTitle',
              label: 'Rubrik',
              type: 'text',
              defaultValue: 'Shoppa Bonnatösen',
            },

            {
              name: 'productsText',
              label: 'Introduktion',
              type: 'textarea',
              defaultValue:
                'Här hittar du kläder och annat från Bonnatösen.',
            },
          ],
        },

        {
          label: 'Information',

          fields: [
            {
              name: 'infoActive',
              label: 'Visa informationssektion',
              type: 'checkbox',
              defaultValue: false,
            },

            {
              name: 'infoEyebrow',
              label: 'Liten rubrik',
              type: 'text',
              defaultValue: 'Bonnatösen Shop',
              admin: {
                condition: (_, siblingData) =>
                  Boolean(siblingData?.infoActive),
              },
            },

            {
              name: 'infoTitle',
              label: 'Rubrik',
              type: 'text',
              defaultValue: 'Mer än bara burgare',
              admin: {
                condition: (_, siblingData) =>
                  Boolean(siblingData?.infoActive),
              },
            },

            {
              name: 'infoText',
              label: 'Text',
              type: 'richText',
              admin: {
                condition: (_, siblingData) =>
                  Boolean(siblingData?.infoActive),
              },
            },

            {
              name: 'infoImage',
              label: 'Bild',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (_, siblingData) =>
                  Boolean(siblingData?.infoActive),
              },
            },
          ],
        },
      ],
    },
  ],
}