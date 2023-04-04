import { ComponentMeta, ComponentStory } from '@storybook/react'
import ProductForm from './index'

export default {
  title: 'Organisms/ProductForm',
  argTypes: {
    onProductSave: {
      description: '등록 버튼을 클릭했을 때의 이벤트 핸들러',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as ComponentMeta<typeof ProductForm>

const Template: ComponentStory<typeof ProductForm> = (args) => (
  <ProductForm {...args} />
)
export const Form = Template.bind({})
