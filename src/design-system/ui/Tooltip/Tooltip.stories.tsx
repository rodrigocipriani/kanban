import { Meta, StoryObj } from '@storybook/react'

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '.'

const meta: Meta = {
  title: 'UI / Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="border px-4 py-2">Hover me</button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip Content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const WithCustomOffset: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="border px-4 py-2">Hover me</button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={10}>
          Tooltip with custom offset
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const WithDifferentSides: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <button className="border px-4 py-2">Side: {side}</button>
            </TooltipTrigger>
            <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
}
