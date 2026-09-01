import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Allmänt',
          fields: [
            {
              name: 'description',
              label: 'Beskrivning',
              type: 'textarea',
              defaultValue:
                'Burgare, gård och saloon. Beroende på säsong hittar du oss på Ladan eller Saloonen.',
            },
          ],
        },

        {
          label: 'Kontakt',
          fields: [
            {
              name: 'contactTitle',
              label: 'Rubrik',
              type: 'text',
              defaultValue: 'Hör av dig',
            },
            {
              name: 'contactText',
              label: 'Kontakttext',
              type: 'textarea',
              defaultValue:
                'Vi svarar endast i telefon under våra öppettider. Det går alltid bra att mejla oss med frågor och förfrågningar.',
            },
            {
              name: 'phone',
              label: 'Telefonnummer',
              type: 'text',
              defaultValue: '+46 79 337 64 85',
            },
            {
              name: 'email',
              label: 'E-post',
              type: 'email',
              defaultValue: 'bonnatosensburgare@gmail.com',
            },
          ],
        },

        {
          label: 'Sociala medier',
          fields: [
            {
              name: 'instagram',
              label: 'Instagram',
              type: 'text',
              defaultValue:
                'https://www.instagram.com/bonnatosensburgare',
            },
            {
              name: 'facebook',
              label: 'Facebook',
              type: 'text',
              defaultValue:
                'https://www.facebook.com/search/top?q=bonnat%C3%B6sen',
            },
            {
              name: 'youtube',
              label: 'YouTube',
              type: 'text',
              defaultValue:
                'https://www.youtube.com/feed/subscriptions/UCaIAV31L9DGmwuf_6Q8k2Ig',
            },
          ],
        },
      ],
    },
  ],
}