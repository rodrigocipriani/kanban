import Typography from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'UI / Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'subtitle1',
          'subtitle2',
          'body1',
          'body2',
          'button',
          'caption',
          'overline',
        ],
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const createStory = (variant: string): Story => ({
  args: {
    children: `Sample Text (${variant})`,
    variant,
  },
})

export const H1 = createStory('h1')
export const H2 = createStory('h2')
export const H3 = createStory('h3')
export const H4 = createStory('h4')
export const H5 = createStory('h5')
export const H6 = createStory('h6')
export const Subtitle1 = createStory('subtitle1')
export const Subtitle2 = createStory('subtitle2')
export const Body1 = createStory('body1')
export const Body2 = createStory('body2')
export const ButtonText = createStory('button')
export const Caption = createStory('caption')
export const Overline = createStory('overline')
