import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SearchIcon, CloudUploadIcon, PersonOutlineIcon } from './'

export default {
  title: 'Atoms/IconButton',
  argTypes: {
    color: {
      control: { type: 'string' },
      description: '아이콘 색상',
      table: {
        type: { summary: 'ThemeColors' },
      },
    },
    backgroundColor: {
      control: { type: 'color' },
      description: '배경 색상',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'number' },
      defaultValue: 24,
      description: '아이콘 크기',
      table: {
        type: { summary: 'number' },
      },
    },
    onClick: {
      description: 'onClick 이벤트 핸들러',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as ComponentMeta<typeof SearchIcon>

const Template: ComponentStory<typeof SearchIcon> = (args) => (
  <>
    <SearchIcon {...args} />
    <CloudUploadIcon {...args} />
    <PersonOutlineIcon {...args} />
  </>
)

export const Normal = Template.bind({})
