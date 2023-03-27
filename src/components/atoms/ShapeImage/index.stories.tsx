import { ComponentMeta, ComponentStory } from '@storybook/react'
import ShapeImage from './index'

export default {
  title: 'Atoms/ShapeImage',
  argTypes: {
    shape: {
      options: ['circle', 'square'],
      control: { type: 'radio' },
      defaultValue: 'square',
      description: '이미지 형태',
      table: {
        type: { summary: 'circle | square' },
        defaultValue: { summary: 'square' },
      },
    },
    src: {
      control: { type: 'text' },
      description: '이미지 URL',
      table: {
        type: { summary: 'string' },
      },
    },
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
} as ComponentMeta<typeof ShapeImage>

const Template: ComponentStory<typeof ShapeImage> = (args) => (
  <ShapeImage {...args} />
)

export const Circle = Template.bind({})
Circle.args = { src: '/images/sample/1.jpg', shape: 'circle' }

export const Square = Template.bind({})
Square.args = { src: '/images/sample/1.jpg', shape: 'square' }
