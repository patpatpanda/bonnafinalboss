import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',

  label: 'Startsida',

  fields: [
    {
      type: 'tabs',

      tabs: [
        {
          label: 'Hero',

          fields: [
            {
              name: 'heroEyebrow',
              label: 'Liten text ovanför rubriken',
              type: 'text',
              defaultValue: 'Bonnatösens Burgare',
            },

            {
              name: 'heroTitle',
              label: 'Huvudrubrik',
              type: 'text',
              required: true,
              defaultValue: 'Burgare, gård och saloon',
            },

            {
              name: 'heroText',
              label: 'Introduktion',
              type: 'textarea',
              defaultValue:
                'Beroende på säsong hittar du oss på ett av våra två ställen – Ladan eller Saloonen.',
            },

            {
              name: 'heroImage',
              label: 'Hero-bild – Desktop',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Bred hero-bild som används på dator och större skärmar.',
              },
            },

            {
              name: 'heroImageMobile',
              label: 'Hero-bild – Mobil',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Stående hero-bild som används på mobiltelefoner.',
              },
            },

            {
              name: 'primaryButtonText',
              label: 'Primär knapptext',
              type: 'text',
              defaultValue: 'Se våra ställen',
            },

            {
              name: 'primaryButtonLink',
              label: 'Primär knapplänk',
              type: 'text',
              defaultValue: '#locations',
            },

            {
              name: 'secondaryButtonText',
              label: 'Sekundär knapptext',
              type: 'text',
              defaultValue: 'Se menyn',
            },

            {
              name: 'secondaryButtonLink',
              label: 'Sekundär knapplänk',
              type: 'text',
              defaultValue: '/menu',
            },
          ],
        },

        {
          label: 'Om Bonnatösen',

          fields: [
            {
              name: 'aboutEyebrow',
              label: 'Liten rubrik',
              type: 'text',
              defaultValue: 'Om oss',
            },

            {
              name: 'aboutTitle',
              label: 'Rubrik',
              type: 'text',
              defaultValue: 'Vi är Bonnatösen',
            },

            {
              name: 'aboutText',
              label: 'Text',
              type: 'richText',
            },

            {
              name: 'aboutImage',
              label: 'Bild',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },

        {
          label: 'Platser',

          fields: [
            {
              name: 'locationsEyebrow',
              label: 'Liten rubrik',
              type: 'text',
              defaultValue: 'Två ställen',
            },

            {
              name: 'locationsTitle',
              label: 'Rubrik',
              type: 'text',
              defaultValue: 'Ladan & Saloonen',
            },

            {
              name: 'locationsText',
              label: 'Introduktion',
              type: 'textarea',
              defaultValue:
                'Beroende på säsong håller vi till på Ladan eller Saloonen.',
            },
          ],
        },

        {
          label: 'Meny',

          fields: [
            {
              name: 'menuEyebrow',
              label: 'Liten rubrik',
              type: 'text',
              defaultValue: 'Hungrig?',
            },

            {
              name: 'menuTitle',
              label: 'Rubrik',
              type: 'text',
              defaultValue: 'Kolla in menyn',
            },

            {
              name: 'menuText',
              label: 'Text',
              type: 'textarea',
              defaultValue:
                'Burgare, pommes och annat gött. Kolla in vad som står på menyn.',
            },

            {
              name: 'menuImage',
              label: 'Bild',
              type: 'upload',
              relationTo: 'media',
            },

            {
              name: 'menuButtonText',
              label: 'Knapptext',
              type: 'text',
              defaultValue: 'Se menyn',
            },

            {
              name: 'menuButtonLink',
              label: 'Knapplänk',
              type: 'text',
              defaultValue: '/menu',
            },
          ],
        },

        {
          label: 'Shop',

          fields: [
            {
              name: 'shopEyebrow',
              label: 'Liten rubrik',
              type: 'text',
              defaultValue: 'Merch',
            },

            {
              name: 'shopTitle',
              label: 'Rubrik',
              type: 'text',
              defaultValue: 'Ta med Bonnatösen hem',
            },

            {
              name: 'shopText',
              label: 'Text',
              type: 'textarea',
              defaultValue:
                'Kläder och annat från Bonnatösen. Shoppen öppnar snart.',
            },

            {
              name: 'shopImage',
              label: 'Bild',
              type: 'upload',
              relationTo: 'media',
            },

            {
              name: 'shopButtonText',
              label: 'Knapptext',
              type: 'text',
              defaultValue: 'Till shoppen',
            },

            {
              name: 'shopButtonLink',
              label: 'Knapplänk',
              type: 'text',
              defaultValue: '/shop',
            },
          ],
        },
      ],
    },
  ],
}