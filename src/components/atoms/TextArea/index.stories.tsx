import { ComponentMeta, ComponentStory } from '@storybook/react'
import TextArea from './index'

export default {
  title: 'Atoms/TextArea',
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더',
      table: {
        type: { summary: 'string' },
      },
    },
    rows: {
      control: { type: 'number' },
      defaultValue: 5,
      description: '행 수',
      table: {
        type: { summary: 'number' },
      },
    },
    minRows: {
      control: { type: 'number' },
      defaultValue: 5,
      description: '최소 행 수',
      table: {
        type: { summary: 'number' },
      },
    },
    maxRows: {
      control: { type: 'number' },
      defaultValue: 10,
      description: '최대 행 수',
      table: {
        type: { summary: 'number' },
      },
    },
    hasError: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: '변형 에러 플래그',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      description: 'onChange 이벤트 핸들러',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as ComponentMeta<typeof TextArea>

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
)

export const Normal = Template.bind({})

export const Error = Template.bind({})
Error.args = { hasError: true }
