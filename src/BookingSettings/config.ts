import type { GlobalConfig } from 'payload'

const timeOptions = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
]

export const BookingSettings: GlobalConfig = {
  slug: 'booking-settings',

  label: 'Bokningsinställningar',

  fields: [
    {
      name: 'maxGuestsPerBooking',
      label: 'Max antal personer per bokning',
      type: 'number',
      required: true,
      defaultValue: 8,
      min: 1,
    },

    {
      name: 'maxGuestsPerSlot',
      label: 'Max antal gäster samtidigt',
      type: 'number',
      required: true,
      defaultValue: 30,
      min: 1,
      admin: {
        description:
          'Max antal gäster som kan vara bokade samtidigt.',
      },
    },

    {
      name: 'intervalMinutes',
      label: 'Tid mellan bokningstider',
      type: 'number',
      required: true,
      defaultValue: 30,
      min: 15,
      admin: {
        description:
          'Exempel: 30 innebär 11:00, 11:30, 12:00 osv.',
      },
    },

    {
      name: 'bookingDurationMinutes',
      label: 'Bokningens längd',
      type: 'select',
      required: true,
      defaultValue: '90',
      options: [
        {
          label: '60 minuter',
          value: '60',
        },
        {
          label: '90 minuter',
          value: '90',
        },
        {
          label: '120 minuter',
          value: '120',
        },
        {
          label: '150 minuter',
          value: '150',
        },
        {
          label: '180 minuter',
          value: '180',
        },
      ],
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Måndag',
          fields: [
            {
              name: 'monday',
              label: 'Måndag',
              type: 'group',
              fields: [
                {
                  name: 'bookable',
                  label: 'Bokningsbar',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'firstBookingTime',
                  label: 'Första bokningstid',
                  type: 'select',
                  options: timeOptions,
                  defaultValue: '11:00',
                },
                {
                  name: 'lastBookingTime',
                  label: 'Sista bokningstid',
                  type: 'select',
                  options: timeOptions,
                  defaultValue: '15:00',
                },
              ],
            },
          ],
        },

        {
          label: 'Tisdag',
          fields: [
            {
              name: 'tuesday',
              label: 'Tisdag',
              type: 'group',
              fields: [
                {
                  name: 'bookable',
                  label: 'Bokningsbar',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'firstBookingTime',
                  label: 'Första bokningstid',
                  type: 'select',
                  options: timeOptions,
                  defaultValue: '11:00',
                },
                {
                  name: 'lastBookingTime',
                  label: 'Sista bokningstid',
                  type: 'select',
                  options: timeOptions,
                  defaultValue: '15:00',
                },
              ],
            },
          ],
        },

        {
          label: 'Onsdag',
          fields: [
            {
              name: 'wednesday',
              label: 'Onsdag',
              type: 'group',
              fields: [
                {
                  name: 'bookable',
                  label: 'Bokningsbar',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'firstBookingTime',
                  label: 'Första bokningstid',
                  type: 'select',
                  options: timeOptions,
                  defaultValue: '11:00',
                },
                {
                  name: 'lastBookingTime',
                  label: 'Sista bokningstid',
                  type: 'select',
                  options: timeOptions,
                  defaultValue: '15:00',
                },
              ],
            },
          ],
        },

        {
          label: 'Torsdag',
          fields: [
            {
              name: 'thursday',
              label: 'Torsdag',
              type: 'group',
              fields: [
                {
                  name: 'bookable',
                  label: 'Bokningsbar',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'firstBookingTime',
                  label: 'Första bokningstid',
                  type: 'select',
                  required: true,
                  options: timeOptions,
                  defaultValue: '11:00',
                },
                {
                  name: 'lastBookingTime',
                  label: 'Sista bokningstid',
                  type: 'select',
                  required: true,
                  options: timeOptions,
                  defaultValue: '15:00',
                },
              ],
            },
          ],
        },

        {
          label: 'Fredag',
          fields: [
            {
              name: 'friday',
              label: 'Fredag',
              type: 'group',
              fields: [
                {
                  name: 'bookable',
                  label: 'Bokningsbar',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'firstBookingTime',
                  label: 'Första bokningstid',
                  type: 'select',
                  required: true,
                  options: timeOptions,
                  defaultValue: '11:00',
                },
                {
                  name: 'lastBookingTime',
                  label: 'Sista bokningstid',
                  type: 'select',
                  required: true,
                  options: timeOptions,
                  defaultValue: '20:00',
                },
              ],
            },
          ],
        },

        {
          label: 'Lördag',
          fields: [
            {
              name: 'saturday',
              label: 'Lördag',
              type: 'group',
              fields: [
                {
                  name: 'bookable',
                  label: 'Bokningsbar',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'firstBookingTime',
                  label: 'Första bokningstid',
                  type: 'select',
                  required: true,
                  options: timeOptions,
                  defaultValue: '11:00',
                },
                {
                  name: 'lastBookingTime',
                  label: 'Sista bokningstid',
                  type: 'select',
                  required: true,
                  options: timeOptions,
                  defaultValue: '21:00',
                },
              ],
            },
          ],
        },

        {
          label: 'Söndag',
          fields: [
            {
              name: 'sunday',
              label: 'Söndag',
              type: 'group',
              fields: [
                {
                  name: 'bookable',
                  label: 'Bokningsbar',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'firstBookingTime',
                  label: 'Första bokningstid',
                  type: 'select',
                  required: true,
                  options: timeOptions,
                  defaultValue: '11:00',
                },
                {
                  name: 'lastBookingTime',
                  label: 'Sista bokningstid',
                  type: 'select',
                  required: true,
                  options: timeOptions,
                  defaultValue: '16:00',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}