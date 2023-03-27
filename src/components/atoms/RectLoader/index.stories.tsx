import { ComponentMeta, ComponentStory } from '@storybook/react'
import RectLoader from './index'

export default {
  title: 'Atoms/RectLoader',
  argTypes: {
    width: {
      control: { type: 'number' },
      defaultValue: 320,
      description: '가로폭',
      table: {
        type: { summary: 'number' },
      },
    },
    height: {
      control: { type: 'number' },
      description: '세로폭',
      defaultValue: 320,
      table: {
        type: { summary: 'number' },
      },
    },
  },
} as ComponentMeta<typeof RectLoader>

const Template: ComponentStory<typeof RectLoader> = (args) => (
  <RectLoader {...args} />
)

export const Normal = Template.bind({})
