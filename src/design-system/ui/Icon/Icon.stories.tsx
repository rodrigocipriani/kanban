import { Meta } from '@storybook/react'
import React from 'react'


import Icon, { Icons } from '.'

const meta: Meta = {
  title: 'UI / Icons',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const AllIcons = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '20px',
    }}
  >
    {Object.keys(Icons).map((iconName) => (
      <div
        key={iconName}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon icon={iconName as keyof typeof Icons} size="md" />
        <span style={{ marginTop: '10px' }}>{iconName}</span>
      </div>
    ))}
  </div>
)

{
  Object.keys(Icons).map((iconName) => (
    <div key={iconName}>
      <Icon icon={iconName as keyof typeof Icons} size="md" />
      <span>{iconName}</span>
    </div>
  ))
}
